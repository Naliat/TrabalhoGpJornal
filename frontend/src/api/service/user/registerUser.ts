import ENV from "../../../config/envConfig";
import { RegisterServiceError } from "../../../errors/user/RegisterServiceError";
import type { UserCreateDTO } from "../../../types/user/dto/UserCreateDTO";
import type { UserResponseDTO } from "../../../types/user/dto/UserResponseDTO";
import { parseErrorResponse } from "../../../utils/parseErrorResponse";

export async function registerUser(data: UserCreateDTO): Promise<UserResponseDTO> {
    const url = `${ENV.API_BASE_URL}/auth/register`;

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (!response.ok)
        await parseErrorResponse(response, RegisterServiceError);

    return await response.json();
}