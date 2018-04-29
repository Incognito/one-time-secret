export const render(body: string): string{
  return `
    <!doctype html>
    <head>
      <meta charset="utf-8">
      <title>One Time Secret</title>
    </head>

    <body>
      ${body}
    </body>
    </html>
  `.trim();
}
