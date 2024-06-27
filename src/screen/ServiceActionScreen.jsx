import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../config/color";
import { SPACING } from "../config/spacing";
import * as Yup from "yup";
import { Formik } from "formik";
import FormContainer from "../components/Form/FormContainer";
import FormInput from "../components/Form/FormInput";
import * as ImagePicker from "expo-image-picker";
import FormSubmitButton from "../components/Form/FormSubmitButton";
import headerImage from "../imgs/GeniosLogo.png";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const ipValidationSchema = Yup.string()
  .required("IP es requerido!")
  .test(
    "is-ip",
    "El campo IP debe ser numérico y tener el formato correcto",
    (value) => {
      if (!value) return false;
      const ipWithPortRegex =
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(:[0-9]{1,5})?$/;
      return ipWithPortRegex.test(value);
    }
  );

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "Nombre invalido")
    .required("Nombre es requerido!"),

  ip: ipValidationSchema,
});

export default function ServiceActionScreen({ route }) {
  const service = route.params;
  const [image, setImage] = useState(service?.imgUrl || "");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const serviceInfo = {
    name: service?.name || "",
    ip: service?.ip || "",
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveService = async (formData) => {
    try {
      setIsLoading(true);
      await axios.post("/service", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("Error in saveService", error.message);
    }
  };

  const updateService = async (formData) => {
    try {
      setIsLoading(true);
      await axios.put(`/service/${service._id}`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      setIsLoading(false);
    } catch (error) {
      console.log("Error in updateService", error.message);
    }
  };

  const actions = async (values, formikActions) => {
    const { name, ip } = values;
    const formData = new FormData();
    if (service) {
      if (service.imgUrl !== image) {
        formData.append("img", {
          name: image.split("/").pop(),
          uri: image,
          type: "image/jpg",
        });
      }
    } else {
      if (image) {
        formData.append("img", {
          name: image.split("/").pop(),
          uri: image,
          type: "image/jpg",
        });
      }
    }

    formData.append("name", name);
    formData.append("ip", ip);
    service ? await updateService(formData) : await saveService(formData);

    formikActions.resetForm();
    formikActions.setSubmitting(false);
    navigation.goBack();
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="grey" size={80} />
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerImageContainer}>
          <Image source={headerImage} style={styles.headerImage} />
        </View>
        <FormContainer>
          <Formik
            initialValues={serviceInfo}
            validationSchema={validationSchema}
            onSubmit={actions}
          >
            {({
              values,
              errors,
              touched,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => {
              const { name, ip } = values;
              return (
                <>
                  <ScrollView contentContainerStyle={styles.formContainer}>
                    <FormInput
                      value={values.name}
                      error={touched.name && errors.name}
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      label="Nombre"
                      placeholder="Nombre"
                    />
                    <FormInput
                      value={values.ip}
                      error={touched.ip && errors.ip}
                      onChangeText={handleChange("ip")}
                      onBlur={handleBlur("ip")}
                      label="IP"
                      placeholder="IP"
                    />

                    <View>
                      <TouchableOpacity
                        style={styles.uploadBtnContainer}
                        onPress={pickImage}
                      >
                        {image ? (
                          <Image
                            source={{ uri: image }}
                            style={{ width: "100%", height: "100%" }}
                          />
                        ) : (
                          <Text style={styles.uploadBtn}>
                            Seleccionar imagen
                          </Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                  <View style={styles.buttonContainer}>
                    <FormSubmitButton
                      submitting={isSubmitting}
                      onPress={handleSubmit}
                      title={service ? "Actualizar" : "Guardar"}
                    />
                  </View>
                </>
              );
            }}
          </Formik>
        </FormContainer>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING * 2,
  },
  headerImage: {
    width: 300,
    height: 100,
    resizeMode: "cover",
  },
  formContainer: {
    flexGrow: 1,
    padding: 20,
  },

  uploadBtnContainer: {
    height: 125,
    width: 125,
    borderRadius: 60,
    borderColor: colors.light,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    overflow: "hidden",
    marginVertical: 10,
    // marginLeft: 100,
  },

  uploadBtn: {
    textAlign: "center",
    fontSize: 16,
    opacity: 0.3,
    fontWeight: "bold",
    color: colors.light,
  },
  buttonContainer: {
    padding: 20,
  },

  backButton: {
    position: "absolute",
    top: 30,
    left: 5,
  },
});
