import type { UserForm } from "../../types/user/domain/UserForm";
import type { UserCreateDTO } from "../../types/user/dto/UserCreateDTO";

export const toUserCreateDTO = (
  form: UserForm
): UserCreateDTO => ({
  username: form.username,
  email: form.email,
  password: form.password,
  user_type: form.userType,
});