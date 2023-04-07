import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    orientation: "landscape",
    size: "A4",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 12,
    borderWidth: 1,
    padding: 5,
    borderStyle: "solid",
    borderColor: "#bfbfbf",
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
});

function PdfDocument() {
  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.title}>Product Detail</Text>
          <View style={styles.table}>
           
          </View>
        </Page>
      </Document>
    </>
  );
}

export default PdfDocument;
