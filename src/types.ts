import React from 'react'
import { TextStyle, ViewStyle } from 'react-native'

// export type Format = | 'CODE39' | 'CODE128' | 'CODE128A' | 'CODE128B' | 'CODE128C' | 'EAN13' | 'EAN8' | 'EAN5' | 'EAN2' | 'UPC' | 'UPCE' | 'ITF14' | 'ITF' | 'MSI' | 'MSI10' | 'MSI11' | 'MSI1010' | 'MSI1110' | 'pharmacode' | 'codabar'

export enum Format {
   CODE39 = 'CODE39',
   CODE128 = 'CODE128',
   CODE128A = 'CODE128A',
   CODE128B = 'CODE128B',
   CODE128C = 'CODE128C',
   EAN13 = 'EAN13',
   EAN8 = 'EAN8',
   EAN5 = 'EAN5',
   EAN2 = 'EAN2',
   UPC = 'UPC',
   UPCE = 'UPCE',
   ITF14 = 'ITF14',
   ITF = 'ITF',
   MSI = 'MSI',
   MSI10 = 'MSI10',
   MSI11 = 'MSI11',
   MSI1010 = 'MSI1010',
   MSI1110 = 'MSI1110',
   pharmacode = 'pharmacode',
   codabar = 'codabar'
}

export type CodeBase = {
  value: string;
  width?: number;
  maxWidth?: number;
  height?: number;
  format?: Format;
  lineColor?: string;
  background?: string;
  text?: React.ReactNode;
  textStyle?: TextStyle;
  style?: ViewStyle;
  onError?: (err: any) => void;
}

export type BarCodeProps = {

} & CodeBase

export type QRCodeProps = {

}

export interface SmartCodeProps extends BarCodeProps, QRCodeProps {}