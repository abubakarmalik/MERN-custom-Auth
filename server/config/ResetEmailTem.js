const ResetEmailTem = `
 <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td bgcolor="#4F46E5" align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;">
          <tr>
            <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td bgcolor="#4F46E5" align="center" style="padding: 0px 10px 0px 10px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;">
          <tr>
            <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #4F46E5; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 25px;">
              <h3 style="font-size: 28px; font-weight:800;">Password Change Alert</h3>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;">
          <tr>
            <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
              <p style="margin: 0;">Hello \${name},</p> <br/>
              <p style="margin: 0;">Your password for Custom MERN Auth has been successfully changed. If you did not make this change, please contact our support immediately.</p>
            </td>
          </tr>
           
         <tr>
            <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
              <p style="margin: 0;">If you made this change, you can safely ignore this email.</p>
            </td>
          </tr>
          <tr>
            <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
              <p style="margin: 0;">Regards,<br>Abubakar Malik<br>MERN Developer</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
`;
module.exports = ResetEmailTem;
