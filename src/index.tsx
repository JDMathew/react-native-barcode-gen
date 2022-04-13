import React, { useMemo } from 'react'
import { View, Text } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import barcodes from 'jsbarcode/src/barcodes'
import { BarCodeProps } from './types'

const defaultProps = {
    value: '',
    format: 'CODE128',
    width: 2,
    height: 100,
    lineColor: '#000000',
    background: '#ffffff',
}

type Props = BarCodeProps & typeof defaultProps

type EncoderT = keyof typeof barcodes

const encode = (text, Encoder, options) => {
  if (typeof text !== 'string' || text.length === 0) {
    throw new Error('Barcode value must be a non-empty string')
  }
  const encoder = new Encoder(text, options)
  if (!encoder.valid()) {
    throw new Error('Invalid barcode for selected format.')
  }
  return encoder.encode()
}



const Barcode = ({ value, width, height, format, lineColor, background, text, textStyle, style, onError, maxWidth, }: Props) => {
  const drawRect = (x, y, rectWidth, rectHeight) =>  `M${x},${y}h${rectWidth}v${rectHeight}h-${rectWidth}z`

  const drawSvgBarCode = (encoded) => {
    const rects = []
    const { data: binary } = encoded

    const barCodeWidth = binary.length * width
    const singleBarWidth =
      typeof maxWidth === 'number' && barCodeWidth > maxWidth
        ? maxWidth / binary.length
        : width
    let barWidth = 0
    let x = 0
    let yFrom = 0

    for (let b = 0; b < binary.length; b++) {
      x = b * singleBarWidth
      if (binary[b] === '1') {
        barWidth++
      } else if (barWidth > 0) {
        rects[rects.length] = drawRect(
          x - singleBarWidth * barWidth,
          yFrom,
          singleBarWidth * barWidth,
          height
        )
        barWidth = 0
      }
    }

    if (barWidth > 0) {
      rects[rects.length] = drawRect(
        x - singleBarWidth * (barWidth - 1),
        yFrom,
        singleBarWidth * barWidth,
        height
      )
    }

    return rects
  }

  const { bars, barCodeWidth } = useMemo(() => {
    try {
      const encoder = barcodes[format]
      if (!encoder) {
        throw new Error('Invalid barcode format.')
      }
      const options = { width, format, height, lineColor, background, flat: true }
      const encoded = encode(value, encoder, options)
      const barCodeWidth = encoded.data.length * width
      return {
        bars: drawSvgBarCode(encoded),
        barCodeWidth:
          typeof maxWidth === 'number' && barCodeWidth > maxWidth
            ? maxWidth
            : barCodeWidth,
      }
    } catch (error) {
      if (__DEV__) {
        console.error(error.message)
      }
      if (onError) {
        onError(error)
      }
    }
    return {
      bars: [],
      barCodeWidth: 0,
    }
  }, [value, width, height, format, lineColor, background, maxWidth])

  return (
    <View
      style={[{ backgroundColor: background, alignItems: 'center' }, style]}
    >
      <Svg height={height} width={barCodeWidth} fill={lineColor}>
        <Path d={bars.join(' ')} />
      </Svg>
      {text && <Text style={[{ textAlign: 'center' }, textStyle]}>{text}</Text>}
    </View>
  )
}


Barcode.defaultProps = defaultProps

export default Barcode
