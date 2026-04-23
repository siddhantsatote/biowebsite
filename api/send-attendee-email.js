import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL;

const sendJson = (res, status, body) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
};

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  if (!resendApiKey || !fromEmail) {
    return sendJson(res, 500, { error: "Email service is not configured" });
  }

  const { attendeeEmail, attendeeName, eventName, passNumber, issuedAt, company, designation } = req.body || {};

  if (!attendeeEmail || !attendeeName || !eventName || !passNumber || !issuedAt) {
    return sendJson(res, 400, { error: "Missing required attendee email data" });
  }

  try {
    const resend = new Resend(resendApiKey);

    const safeName = escapeHtml(attendeeName);
    const safeEvent = escapeHtml(eventName);
    const safePass = escapeHtml(passNumber);
    const safeCompany = escapeHtml(company);
    const safeDesignation = escapeHtml(designation);
    const issuedLabel = new Date(issuedAt).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    await resend.emails.send({
      from: fromEmail,
      to: attendeeEmail,
      subject: `Your ${eventName} visitor pass is confirmed`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #10261a;">
          <h2 style="margin-bottom: 8px;">Registration Confirmed</h2>
          <p style="margin-top: 0; color: #3e5c4d;">Hello ${safeName}, your visitor registration has been received.</p>

          <div style="background: #f4fbf6; border: 1px solid #d2ead9; border-radius: 12px; padding: 16px; margin-top: 16px;">
            <p style="margin: 0 0 6px;"><strong>Event:</strong> ${safeEvent}</p>
            <p style="margin: 0 0 6px;"><strong>Pass Number:</strong> ${safePass}</p>
            <p style="margin: 0 0 6px;"><strong>Issued:</strong> ${issuedLabel}</p>
            <p style="margin: 0 0 6px;"><strong>Company:</strong> ${safeCompany || "-"}</p>
            <p style="margin: 0;"><strong>Designation:</strong> ${safeDesignation || "-"}</p>
          </div>

          <p style="margin-top: 18px;">Please keep your QR visitor pass ready for entry at the venue.</p>
          <p style="margin-top: 0; color: #3e5c4d;">Regards,<br />ACE Event Managers</p>
        </div>
      `,
    });

    return sendJson(res, 200, { ok: true });
  } catch (error) {
    return sendJson(res, 500, {
      error: "Failed to send attendee email",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
