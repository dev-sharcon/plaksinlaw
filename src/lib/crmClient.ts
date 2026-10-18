export interface CrmResponse {
  ok: boolean;
  error?: string;
  checkoutUrl?: string;
}

/** POSTs a form submission to /api/crm and throws with the server error code on failure. */
export async function postCrm(payload: Record<string, unknown>): Promise<CrmResponse> {
  const res = await fetch("/api/crm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await res.json().catch(() => ({ ok: false }))) as CrmResponse;
  if (!res.ok || !data.ok) throw new Error(data.error || `http_${res.status}`);
  return data;
}

export function crmErrorMessage(err: unknown, isRu: boolean) {
  const code = err instanceof Error ? err.message : "";
  if (code === "captcha_failed") {
    return isRu ? "Проверка «я не робот» не пройдена. Попробуйте ещё раз." : "Verification failed. Please try again.";
  }
  if (code === "card_payments_unavailable") {
    return isRu
      ? "Оплата картой временно недоступна. Пожалуйста, используйте Zelle или напишите нам в WhatsApp / Telegram."
      : "Card payments are temporarily unavailable. Please use Zelle or message us via WhatsApp / Telegram.";
  }
  if (code === "invalid_amount") {
    return isRu ? "Сумма должна быть от $1 до $25,000." : "Amount must be between $1 and $25,000.";
  }
  if (code === "invalid_email") {
    return isRu ? "Проверьте адрес электронной почты." : "Please check your email address.";
  }
  return isRu
    ? "Не удалось отправить. Пожалуйста, позвоните +1 (929) 249-0070 или напишите нам в WhatsApp / Telegram."
    : "Submission failed. Please call +1 (929) 249-0070 or message us via WhatsApp / Telegram.";
}
