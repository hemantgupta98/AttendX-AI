import { Resend } from "resend";

async function sendStudentInvite({ studentName, studentEmail, studentCode }) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY must be set in environment");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const senderEmail = process.env.RESEND_FROM_EMAIL;
  if (typeof senderEmail !== "string" || !senderEmail.trim()) {
    throw new Error("RESEND_FROM_EMAIL must be set in environment");
  }

  const signupUrl = "https://attendx-ai.vercel.app/src/student/auth/signup";

  console.log("[sendStudentInvite] Raw input:", {
    studentName,
    studentEmail,
    studentCode,
  });

  if (typeof studentEmail !== "string") {
    throw new Error("studentEmail must be a string before calling Resend");
  }

  const normalizedStudentEmail = studentEmail.trim();
  if (!normalizedStudentEmail) {
    throw new Error("studentEmail cannot be empty before calling Resend");
  }

  console.log(
    "[sendStudentInvite] Normalized recipient:",
    normalizedStudentEmail,
  );

  const emailData = {
    from: `Attendance Management System <${senderEmail.trim()}>`,

    to: normalizedStudentEmail,

    subject: "🎓 You're Invited to Join Our Attendance Management System",

    html: `
      <div style="
        font-family: Arial, sans-serif;
        background-color: #f4f6f8;
        padding: 30px 15px;
      ">
        
        <div style="
          max-width: 600px;
          margin: auto;
          background: #ffffff;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        ">

          <!-- Header -->
          <div style="
            background: linear-gradient(135deg, #4f46e5, #06b6d4);
            color: white;
            padding: 35px 20px;
            text-align: center;
          ">
            <h1 style="margin: 0; font-size: 26px;">
              🎓 You're Invited!
            </h1>

            <p style="margin: 10px 0 0; font-size: 15px;">
              Join our Attendance Management System
            </p>
          </div>


          <!-- Body -->
          <div style="
            padding: 35px 30px;
            color: #333;
          ">

            <h2 style="
              margin-top: 0;
              color: #1f2937;
            ">
              Hello ${studentName} 👋
            </h2>

            <p style="
              font-size: 16px;
              line-height: 1.7;
              color: #4b5563;
            ">
              You have been invited to join our
              <strong>Attendance Management System</strong>.
            </p>

            <p style="
              font-size: 16px;
              line-height: 1.7;
              color: #4b5563;
            ">
              To create your account, please use the student invitation
              code provided below.
            </p>


            <!-- Student Code -->
            <div style="
              margin: 30px 0;
              padding: 25px;
              background: #f8fafc;
              border: 2px dashed #6366f1;
              border-radius: 12px;
              text-align: center;
            ">

              <p style="
                margin: 0 0 10px;
                font-size: 14px;
                color: #6b7280;
              ">
                YOUR STUDENT INVITATION CODE
              </p>

              <div style="
                font-size: 28px;
                font-weight: bold;
                letter-spacing: 3px;
                color: #4f46e5;
              ">
                ${studentCode}
              </div>

            </div>


            <!-- Instructions -->
            <div style="
              background: #eef2ff;
              padding: 20px;
              border-radius: 10px;
              margin-bottom: 25px;
            ">

              <h3 style="
                margin-top: 0;
                color: #4338ca;
              ">
                📋 How to join
              </h3>

              <ol style="
                padding-left: 20px;
                line-height: 1.8;
                color: #4b5563;
              ">
                <li>Click the Sign Up button below.</li>
                <li>Enter your personal details.</li>
                <li>Use the invitation code provided above.</li>
                <li>Create your account.</li>
              </ol>

            </div>


            <!-- Signup Button -->
            <div style="
              text-align: center;
              margin: 35px 0;
            ">

              <a
                href="${signupUrl}"
                style="
                  display: inline-block;
                  background: #4f46e5;
                  color: #ffffff;
                  padding: 15px 30px;
                  border-radius: 8px;
                  text-decoration: none;
                  font-size: 16px;
                  font-weight: bold;
                "
              >
                🚀 Sign Up Now
              </a>

            </div>


            <p style="
              font-size: 14px;
              color: #6b7280;
              line-height: 1.6;
            ">
              Please keep your invitation code safe and do not share it
              with anyone.
            </p>

            <p style="
              margin-top: 30px;
              color: #4b5563;
            ">
              Best regards,<br />
              <strong>Attendance Management System</strong>
            </p>

          </div>


          <!-- Footer -->
          <div style="
            background: #f1f5f9;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #6b7280;
          ">

            <p style="margin: 0;">
              This is an automated invitation email.
            </p>

            <p style="margin: 8px 0 0;">
              © ${new Date().getFullYear()} Attendance Management System
            </p>

          </div>

        </div>

      </div>
    `,
  };

  console.log("[sendStudentInvite] Sending email with payload:", {
    from: emailData.from,
    to: emailData.to,
    subject: emailData.subject,
  });

  const result = await resend.emails.send(emailData);

  console.log("[sendStudentInvite] Raw Resend response:", result);

  if (result?.error) {
    console.error(
      "[sendStudentInvite] Resend returned an error:",
      result.error,
    );
    const resendError = new Error(
      result.error.message || "Resend failed to send invitation email",
    );
    resendError.name = result.error.name || "ResendError";
    resendError.statusCode = result.error.statusCode || 502;
    resendError.resendError = result.error;
    throw resendError;
  }

  return result;
}

export default sendStudentInvite;
