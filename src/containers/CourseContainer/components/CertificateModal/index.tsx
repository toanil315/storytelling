import React from "react";
import CustomModal from "src/components/Modal";
import { UseModalHelper } from "src/hooks/useModal";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
  Font,
} from "@react-pdf/renderer";
import Box from "src/components/commons/Box";
import { useUser } from "src/hooks/apis";
import moment from "moment";
import { DATE_FORMATS } from "src/utils/helpers/formatDate";
import { CourseType } from "src/data-model/CourseTypes";

interface Props {
  modal: UseModalHelper;
  course?: CourseType;
}

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
      fontWeight: 300,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
      fontWeight: 400,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
      fontWeight: 500,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: 600,
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  certificateBg: {
    width: "100%",
    height: "100%",
  },

  signature: {
    position: "absolute",
    top: "440px",
    right: "260px",

    width: "40px",
    height: "40px",
  },

  userName: {
    position: "absolute",
    left: "200px",
    right: "200px",
    textAlign: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "extrabold",
    backgroundColor: "#E9E9E9",
    padding: 2,
    fontFamily: "Roboto",
    letterSpacing: 2,
  },

  text: {
    position: "absolute",
    left: "200px",
    right: "200px",
    textAlign: "center",
    justifyContent: "center",
    fontSize: "10px",
    fontWeight: 400,
    backgroundColor: "#E9E9E9",
    fontFamily: "Roboto",
    minHeight: "40px",
  },
});

const CertificateModal = ({ modal, course }: Props) => {
  const { user } = useUser();

  return (
    <CustomModal onCancel={modal.closeModal} open={modal.show}>
      <Box width="80vw" height="90vh">
        <PDFViewer width={"100%"} height={"100%"}>
          <Document>
            <Page orientation="landscape" size="A4" style={styles.page}>
              <View>
                <Image
                  style={styles.certificateBg}
                  source={"/assets/certificate.jpg"}
                />
              </View>
              <Text style={{ top: "280px", ...styles.userName }}>
                {user?.fullName.toUpperCase()}
              </Text>
              <Text style={{ top: "350px", ...styles.text }}>
                For successfully completed the online course{" "}
                <Text style={{ fontWeight: 600 }}>{course?.name}</Text> on{" "}
                {moment(Date.now()).format(DATE_FORMATS.DEFAULT)}
              </Text>
              <View>
                <Image
                  style={styles.signature}
                  source={"/assets/signature.png"}
                />
              </View>
            </Page>
          </Document>
        </PDFViewer>
      </Box>
    </CustomModal>
  );
};

export default CertificateModal;
