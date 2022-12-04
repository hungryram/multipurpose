import { ServerClient } from 'postmark'

export default async function (req, res) {
  const serverToken = process.env.NEXT_PUBLIC_POSTMARK_API_TOKEN;
  const client = new ServerClient(serverToken);
  const submit = () => {
    const postmarkApiRes = client.sendEmailWithTemplate({
      "From": req.body.sendFrom,
      "To": req.body.emailAlerts,
      "ReplyTo": req.body.email,
      "Bcc": req.body.emailBcc,
      "Cc": req.body.emailCc,
      "TemplateAlias": "bridge-website-contact-form",
      "TemplateModel": {
        "name": req.body.name,
        "email": req.body.email,
        "phone": req.body.phone,
        "message": req.body.message,
      }
    })
    return postmarkApiRes
  }
  try {
    const submitRes = await submit()
    res.status(200).json(submitRes)
  }
  catch(err) {
    res.status(500).json(err)
  }
}