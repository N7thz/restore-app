"use server"

import { auth } from "@/lib/auth"
import { supabase } from "@/lib/supabase"
import { headers } from "next/headers"
import { updateUser } from "./users/update-user"
import { createNotification } from "./notifications/create-notification"

function getPublicUrl(path: string) {

  const { data: { publicUrl } } = supabase
    .storage
    .from("avatars")
    .getPublicUrl(path)

    return publicUrl
}

function generateNameFile({ id, filename }: { id: string, filename: string }) {
  return `${id}_${filename}`
}

async function deleteImage(filename: string) {

  const removeFile = await supabase
    .storage
    .from('avatars')
    .remove([filename])

  if (removeFile.error) throw new Error("Não foi possivel atualizar a imagem")
}

async function updateImage(id: string, file: File) {

  const filename = generateNameFile({ id, filename: file.name })

  const { data, error } = await supabase
    .storage
    .from("avatars")
    .upload(filename, file, {
      cacheControl: '0',
      upsert: true,
      contentType: file.type
    })

  if (error)
    throw new Error("Não foi possivel atualizar a imagem")

  return data
}

export async function uploadImage(file: File) {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) throw new Error("Não foi encontrado o usuário")

  const { user: { id, image } } = session

  if (image) {

    const path = image.slice(74)

    await deleteImage(path)
  }

  const { path } = await updateImage(id, file)

  const publicUrl = getPublicUrl(path)

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