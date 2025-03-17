import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "Supababse url";
const supabaseKey = "Tu llave anon public";

const supabase = createClient(supabaseUrl, supabaseKey);
//hola
export const uploadImage = async (file, bucket, folder) => {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()
      .toString(36)
      .substring(2, 15)}_${Date.now()}.${fileExt}`;

    const filePath = `${folder}/${fileName}`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    throw error;
  }
};
