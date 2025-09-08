import { SpanErrorMessage } from "@/components/span-error"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { InputProductExitObjectProps } from "@/schemas/product-exit-object"
import { useFormContext } from "react-hook-form"

export const UsernameLabel = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<InputProductExitObjectProps>()

  return (
    <>
      <Label htmlFor="username" className="flex-col items-start">
        A quem foi entrege:
        <Input
          id="username"
          className={cn(
            errors.username && [
              "focus-visible:ring-destructive",
              "not-focus-visible:border-destructive",
            ]
          )}
          {...register("username")}
        />
      </Label>
      {errors.username && (
        <SpanErrorMessage message={errors.username.message} />
      )}
    </>
  )
}
