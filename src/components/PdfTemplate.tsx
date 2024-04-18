import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  receipt: {
    padding: 20,
    fontFamily: 'Helvetica'
  },
  title: {
    fontSize: 18,
    marginBottom: 10
  },
  field: {
    marginBottom: 5
  },
  value: {
    marginLeft: 10
  }
})

const PDFTemplate = ({ receiptNumber, paidNumber, vatAmount }: { receiptNumber: number; paidNumber: string; vatAmount: string }) => {
  return (
    <Document>
      <Page size='A4' style={styles.receipt}>
        <Text style={styles.title}>Receipt</Text>
        <View style={styles.field}>
          <Text>
            <strong>Receipt Number:</strong>
            <Text style={styles.value}> {receiptNumber}</Text>
          </Text>
        </View>
        <View style={styles.field}>
          <Text>
            <strong>Paid Number:</strong>
            <Text style={styles.value}> {paidNumber}</Text>
          </Text>
        </View>
        <View style={styles.field}>
          <Text>
            <strong>VAT Amount:</strong>
            <Text style={styles.value}> ${vatAmount}</Text>
          </Text>
        </View>
      </Page>
    </Document>
  )
}

export default PDFTemplate
