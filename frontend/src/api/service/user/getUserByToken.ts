import ENV from "../../../config/envConfig";
import { TokenError } from "../../../errors/auth/TokenError";
import type { UserResponseDTO } from "../../../types/user/dto/UserResponseDTO";
import { parseErrorResponse } from "../../../utils/parseErrorResponse";

export async function getUserByToken(token: string): Promise<UserResponseDTO> {
    const url = `${ENV.API_BASE_URL}/auth/me`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if(!response.ok)
        await parseErrorResponse(response, TokenError);

    return await response.json();
}