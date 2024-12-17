// Paulo Henrique

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'marvieifpe@gmail.com',
    pass: 'kvlqtoseeaeavnxq',
  },
})

export async function sendEmail({to, subject, text, html}){
  try {
    const info = await transporter.sendMail({
      from: `"OrganiConecta"`,
      to: `${to}`,
      subject: `${subject}`,
      text: `${text}`,
      html: `${html}`,
    })
    console.log('Email enviado: ' + info.response)
  } catch (error) {
    console.error('Erro ao enviar email:', error)
  }
}