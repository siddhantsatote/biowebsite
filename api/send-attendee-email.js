import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const awsRegion = process.env.AWS_REGION;
const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const fromEmail = process.env.AWS_SES_FROM_EMAIL;

const sesClient = awsRegion && awsAccessKeyId && awsSecretAccessKey
  ? new SESv2Client({
      region: awsRegion,
      credentials: {
        accessKeyId: awsAccessKeyId,
        secretAccessKey: awsSecretAccessKey,
      },
    })
  : null;

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

  if (!sesClient || !fromEmail) {
    return sendJson(res, 500, { error: "Email service is not configured" });
  }

  const parsedBody =
    typeof req.body === "string"
      ? JSON.parse(req.body || "{}")
      : req.body || {};
  const {
    attendeeEmail,
    attendeeName,
    eventName,
    passNumber,
    issuedAt,
    company,
    designation,
  } = parsedBody;

  if (
    !attendeeEmail ||
    !attendeeName ||
    !eventName ||
    !passNumber ||
    !issuedAt
  ) {
    return sendJson(res, 400, {
      error: "Missing required attendee email data",
    });
  }

  try {
    const safeName = escapeHtml(attendeeName);
    const safeEvent = escapeHtml(eventName);
    const safePass = escapeHtml(passNumber);
    const safeCompany = escapeHtml(company);
    const safeDesignation = escapeHtml(designation);
    const issuedLabel = new Date(issuedAt).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const htmlBody = `
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
    `;

    const command = new SendEmailCommand({
      FromEmailAddress: fromEmail,
      Destination: {
        ToAddresses: [attendeeEmail],
      },
      Content: {
        Simple: {
          Subject: {
            Data: `Your ${eventName} visitor pass is confirmed`,
            Charset: "UTF-8",
          },
          Body: {
            Html: {
              Data: htmlBody,
              Charset: "UTF-8",
            },
            Text: {
              Data: `Hello ${attendeeName}, your visitor registration for ${eventName} has been received. Pass Number: ${passNumber}.`,
              Charset: "UTF-8",
            },
          },
        },
      },
    });

    const sendResult = await sesClient.send(command);

    return sendJson(res, 200, {
      ok: true,
      emailId: sendResult?.MessageId || null,
    });
  } catch (error) {
    return sendJson(res, 500, {
      error: "Failed to send attendee email",
      details:
        error instanceof Error
          ? error.message
          : typeof error === "object" && error && "name" in error && "message" in error
            ? `${String((error).name)}: ${String((error).message)}`
            : "Unknown error",
    });
  }
}
