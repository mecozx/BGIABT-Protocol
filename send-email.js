export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, projectName, description, mobile } = req.body;

  // Basic validation
  if (!name || !email || !projectName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: 'Email service not configured' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // ⚠️  Replace with your verified Resend sender domain
        from: 'BGIABT Protocol <noreply@web3blockchain.pro.bd>',
        to: [email],
        subject: `✔ Abstract Received — ${projectName} | BGIABT`,
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Abstract Confirmation</title>
</head>
<body style="margin:0;padding:0;background:#F5F5F7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#1D1D1F;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F5F7;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#1D1D1F;border-radius:20px 20px 0 0;padding:32px 40px;text-align:center;">
              <div style="display:inline-flex;align-items:center;gap:10px;">
                <div style="width:10px;height:10px;border-radius:50%;background:#0066CC;display:inline-block;"></div>
                <span style="font-size:20px;font-weight:700;letter-spacing:-0.5px;color:#FFFFFF;">BGIABT</span>
              </div>
              <p style="margin:12px 0 0;font-size:12px;color:#86868B;letter-spacing:2px;text-transform:uppercase;font-family:monospace;">
                Protocol Registry Confirmation
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#FFFFFF;padding:40px 40px 32px;border-left:1px solid #E5E5EA;border-right:1px solid #E5E5EA;">
              <h1 style="margin:0 0 8px;font-size:28px;font-weight:700;letter-spacing:-0.5px;color:#1D1D1F;">
                Abstract Received ✔
              </h1>
              <p style="margin:0 0 28px;font-size:15px;color:#86868B;line-height:1.6;">
                Hi ${name}, your submission has been logged in the BGIABT compilation registry. Our team will review your architecture and reach out shortly.
              </p>

              <!-- Submission Summary -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F5F7;border-radius:14px;padding:24px;margin-bottom:28px;">
                <tr><td colspan="2" style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#86868B;font-family:monospace;padding-bottom:16px;border-bottom:1px solid #E5E5EA;">// Submission Summary</td></tr>
                <tr>
                  <td style="padding-top:14px;font-size:12px;color:#86868B;font-family:monospace;width:40%;vertical-align:top;">INNOVATOR</td>
                  <td style="padding-top:14px;font-size:14px;font-weight:600;color:#1D1D1F;">${name}</td>
                </tr>
                <tr>
                  <td style="padding-top:10px;font-size:12px;color:#86868B;font-family:monospace;vertical-align:top;">PROJECT VECTOR</td>
                  <td style="padding-top:10px;font-size:14px;font-weight:600;color:#0066CC;">${projectName}</td>
                </tr>
                ${mobile ? `<tr>
                  <td style="padding-top:10px;font-size:12px;color:#86868B;font-family:monospace;vertical-align:top;">MOBILE</td>
                  <td style="padding-top:10px;font-size:14px;font-weight:600;color:#1D1D1F;">+880 ${mobile}</td>
                </tr>` : ''}
                ${description ? `<tr>
                  <td style="padding-top:10px;font-size:12px;color:#86868B;font-family:monospace;vertical-align:top;">BLUEPRINT</td>
                  <td style="padding-top:10px;font-size:13px;color:#1D1D1F;line-height:1.6;">${description.substring(0, 180)}${description.length > 180 ? '…' : ''}</td>
                </tr>` : ''}
              </table>

              <!-- What happens next -->
              <h2 style="margin:0 0 16px;font-size:15px;font-weight:700;color:#1D1D1F;">What happens next?</h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width:28px;vertical-align:top;padding-top:2px;">
                    <div style="width:20px;height:20px;border-radius:50%;background:#0066CC;color:#fff;font-size:10px;font-weight:700;text-align:center;line-height:20px;">1</div>
                  </td>
                  <td style="padding-bottom:14px;font-size:13px;color:#86868B;line-height:1.6;padding-left:10px;">
                    Your abstract is queued for technical review by our evaluation panel.
                  </td>
                </tr>
                <tr>
                  <td style="width:28px;vertical-align:top;padding-top:2px;">
                    <div style="width:20px;height:20px;border-radius:50%;background:#34C759;color:#fff;font-size:10px;font-weight:700;text-align:center;line-height:20px;">2</div>
                  </td>
                  <td style="padding-bottom:14px;font-size:13px;color:#86868B;line-height:1.6;padding-left:10px;">
                    Shortlisted innovators will receive an invitation to the live presentation loop.
                  </td>
                </tr>
                <tr>
                  <td style="width:28px;vertical-align:top;padding-top:2px;">
                    <div style="width:20px;height:20px;border-radius:50%;background:#FF9500;color:#fff;font-size:10px;font-weight:700;text-align:center;line-height:20px;">3</div>
                  </td>
                  <td style="padding-bottom:4px;font-size:13px;color:#86868B;line-height:1.6;padding-left:10px;">
                    Selected architectures enter the global scaling pipeline with permanent royalty allocation.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="background:#FFFFFF;padding:0 40px 40px;border-left:1px solid #E5E5EA;border-right:1px solid #E5E5EA;text-align:center;">
              <a href="https://web3blockchain.pro.bd" style="display:inline-block;background:#1D1D1F;color:#FFFFFF;font-size:14px;font-weight:600;padding:14px 32px;border-radius:50px;text-decoration:none;letter-spacing:-0.2px;">
                Visit BGIABT Portal
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F5F5F7;border:1px solid #E5E5EA;border-top:none;border-radius:0 0 20px 20px;padding:24px 40px;text-align:center;">
              <p style="margin:0;font-size:11px;color:#86868B;line-height:1.8;">
                BGIABT Protocol &mdash; Bridging Global Innovation &amp; Bangladeshi Talent<br>
                <a href="https://web3blockchain.pro.bd" style="color:#0066CC;text-decoration:none;">web3blockchain.pro.bd</a>
              </p>
              <p style="margin:10px 0 0;font-size:10px;color:#C7C7CC;">
                You received this because you submitted an abstract at bgiabt.vercel.app
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend error:', data);
      return res.status(500).json({ error: data.message || 'Failed to send email' });
    }

    return res.status(200).json({ success: true, id: data.id });

  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
