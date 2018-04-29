export function render(body: string): string {
  return `
    <!doctype html>
    <head>
      <meta charset="utf-8">
      <title>One Time Secret</title>
      <style>
        /* Sections taken from pure-css */
        table {
          border-collapse: collapse;
          border-spacing: 0;
          border-collapse: collapse;
          border-spacing: 0;
          empty-cells: show;
          border: 1px solid #cbcbcb;
        }

        td,
        th {
          padding: 0;
          border-left: 1px solid #cbcbcb;/*  inner column border */
          border-width: 0 0 0 1px;
          font-size: inherit;
          margin: 0;
          overflow: visible; /*to make ths where the title is really long work*/
          padding: 0.5em 1em; /* cell padding */
        }

        table td:first-child,
        table th:first-child {
            border-left-width: 0;
        }

        table thead {
            background-color: #e0e0e0;
            color: #000;
            text-align: left;
            vertical-align: bottom;
        }

        table td {
            background-color: transparent;
        }

      </style>
    </head>

    <body>
      ${body}

      <hr/>
      <a href="https://github.com/incognito/one-time-secret">Incognito/One-Time-Secret</a>
    </body>


    </html>
  `.trim();
}
