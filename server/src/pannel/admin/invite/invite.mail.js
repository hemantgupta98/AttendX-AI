import brevo from "../../../config/brevo.js";

async function sendStudentInvite({ studentName, studentEmail, studentCode }) {
  if (!process.env.BREVO_API_KEY) {
    throw new Error("BREVO_API_KEY must be set in environment");
  }

  console.log("[sendStudentInvite] Raw input:", {
    studentName,
    studentEmail,
    studentCode,
  });

  if (typeof studentName !== "string") {
    throw new Error("studentName must be a string");
  }

  if (typeof studentEmail !== "string") {
    throw new Error("studentEmail must be a string before sending mail");
  }

  if (typeof studentCode !== "string") {
    throw new Error("studentCode must be a string");
  }

  const normalizedStudentName = studentName.trim();
  const normalizedStudentEmail = studentEmail.trim();
  const normalizedStudentCode = studentCode.trim();

  if (
    !normalizedStudentName ||
    !normalizedStudentEmail ||
    !normalizedStudentCode
  ) {
    throw new Error(
      "studentName, studentEmail, and studentCode cannot be empty",
    );
  }

  console.log(
    "[sendStudentInvite] Normalized recipient:",
    normalizedStudentEmail,
  );

  const senderEmail =
    process.env.BREVO_SENDER_EMAIL || "guptaanshu9868@gmail.com";
  const senderName =
    process.env.BREVO_SENDER_NAME || "Attendance Management System";

  const signupUrl = "https://attendx-ai.vercel.app/src/student/auth/signup";

  const htmlContent = `
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
              Hello ${normalizedStudentName} 👋
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
                ${normalizedStudentCode}
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
              © ${new Date().getFullYear()} AttendX-AI Inc. All rights reserved.
            </p>

          </div>

        </div>

      </div>
    `;

  console.log("[sendStudentInvite] Sending email with payload:", {
    from: senderEmail,
    to: normalizedStudentEmail,
    subject: "🎓 You're Invited to Join Our Attendance Management System",
  });

  const result = await brevo.transactionalEmails.sendTransacEmail({
    sender: {
      name: senderName,
      email: senderEmail,
    },
    to: [
      {
        email: normalizedStudentEmail,
        name: normalizedStudentName,
      },
    ],
    replyTo: {
      email: senderEmail,
      name: senderName,
    },
    subject: "🎓 You're Invited to Join Our Attendance Management System",
    htmlContent,
  });

  console.log("[sendStudentInvite] Raw Brevo response:", result);

  return result;
}

async function sendTeacherInvite({ teacherName, teacherEmail, teacherCode }) {
  if (!process.env.BREVO_API_KEY) {
    throw new Error("BREVO_API_KEY must be set in environment");
  }

  console.log("[sendTeacherInvite] Raw input:", {
    teacherName,
    teacherEmail,
    teacherCode,
  });

  if (typeof teacherName !== "string") {
    throw new Error("teacherName must be a string");
  }

  if (typeof teacherEmail !== "string") {
    throw new Error("teacherEmail must be a string before sending mail");
  }

  if (typeof teacherCode !== "string") {
    throw new Error("teacherCode must be a string");
  }

  const normalizedTeacherName = teacherName.trim();
  const normalizedTeacherEmail = teacherEmail.trim();
  const normalizedTeacherCode = teacherCode.trim();

  if (
    !normalizedTeacherName ||
    !normalizedTeacherEmail ||
    !normalizedTeacherCode
  ) {
    throw new Error(
      "teacherName, teacherEmail, and teacherCode cannot be empty",
    );
  }

  console.log(
    "[sendTeacherInvite] Normalized recipient:",
    normalizedTeacherEmail,
  );

  const senderEmail =
    process.env.BREVO_SENDER_EMAIL || "guptaanshu9868@gmail.com";

  const senderName =
    process.env.BREVO_SENDER_NAME || "Attendance Management System";

  const signupUrl = "https://attendx-ai.vercel.app/src/teacher/auth/signup";

  const htmlContent = `
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
            Join our Attendance Management System as a Teacher
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
            Hello ${normalizedTeacherName} 👋
          </h2>

          <p style="
            font-size: 16px;
            line-height: 1.7;
            color: #4b5563;
          ">
            You have been invited to join our
            <strong>Attendance Management System</strong>
            as a Teacher.
          </p>

          <p style="
            font-size: 16px;
            line-height: 1.7;
            color: #4b5563;
          ">
            To create your teacher account, please use the
            teacher invitation code provided below.
          </p>


          <!-- Teacher Code -->
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
              YOUR TEACHER INVITATION CODE
            </p>

            <div style="
              font-size: 28px;
              font-weight: bold;
              letter-spacing: 3px;
              color: #4f46e5;
            ">
              ${normalizedTeacherCode}
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
              <li>Select or register as a Teacher.</li>
              <li>Use the teacher invitation code provided above.</li>
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
              🚀 Sign Up as Teacher
            </a>

          </div>


          <p style="
            font-size: 14px;
            color: #6b7280;
            line-height: 1.6;
          ">
            Please keep your teacher invitation code safe and do not
            share it with anyone.
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
            © ${new Date().getFullYear()}
           AttendX-AI Inc. All rights reserved.
          </p>

        </div>

      </div>

    </div>
  `;

  console.log("[sendTeacherInvite] Sending email with payload:", {
    from: senderEmail,
    to: normalizedTeacherEmail,
    subject:
      "🎓 You're Invited to Join Our Attendance Management System as a Teacher",
  });

  const result = await brevo.transactionalEmails.sendTransacEmail({
    sender: {
      name: senderName,
      email: senderEmail,
    },

    to: [
      {
        email: normalizedTeacherEmail,
        name: normalizedTeacherName,
      },
    ],

    replyTo: {
      email: senderEmail,
      name: senderName,
    },

    subject:
      "🎓 You're Invited to Join Our Attendance Management System as a Teacher",

    htmlContent,
  });

  console.log("[sendTeacherInvite] Raw Brevo response:", result);

  return result;
}
export { sendStudentInvite, sendTeacherInvite };
