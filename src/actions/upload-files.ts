"use server"

import { auth } from "@/lib/auth"
import { supabase } from "@/lib/supabase"
import { headers } from "next/headers"
import { updateUser } from "./users/update-user"
import { createNotification } from "./notifications/create-notification"

function generateNameFile({ id, filename }: { id: string, filename: string }) {
  return `${id}_${filename}`
}

export async function uploadImage(file: File) {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) throw new Error("Não foi encontrado o usuário")

  const { user: { id, image } } = session

  if (image) {

    const path = image.slice(74)

    const removeFile = await supabase
      .storage
      .from('avatars')
      .remove([path])

    if (removeFile.error) throw new Error("Não foi possivel atualizar a imagem")
  }

  const { type } = file

  const filename = generateNameFile({ id, filename: file.name })

  const uploadFile = await supabase
    .storage
    .from("avatars")
    .upload(filename, file, {
      cacheControl: '0',
      upsert: true,
      contentType: type
    })

  if (uploadFile.error)
    throw new Error("Não foi possivel atualizar a imagem")

  const { path } = uploadFile.data

  const { data: { publicUrl } } = supabase
    .storage
    .from("avatars")
    .getPublicUrl(path)


  await updateUser(id, {
    image: publicUrl
  })

  const notification = await createNotification({
    action: "UPDATE",
    name: "Atualização de imagem",
    description: "Imagem atualizada com sucesso",
    createdAt: new Date()
  })

  return { notification }
}