import ENV from "../../../config/envConfig";
import { LoginServiceError } from "../../../errors/auth/LoginServiceError";
import type { TokenResponseDTO } from "../../../types/auth/dto/TokenResponseDTO";
import { parseErrorResponse } from "../../../utils/parseErrorResponse";

export async function loginUser(email: string, password: string): Promise<TokenResponseDTO> {
    const url = `${ENV.API_BASE_URL}/auth/login`;

    const body = new URLSearchParams({
        username: email,
        password,
    });

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
    });

    if(!response.ok)
        await parseErrorResponse(response, LoginServiceError);

    return response.json();
}