import { render as BaseView } from './BaseView'

export const render(url: string): string {
  const view = `
    <h2>Enter a secret</h2>
    <form action='${url}' method='POST'>
      <label for=secret>Secret</label>
      <br>
      <textarea rows=20 cols=80 name="secret"></textarea>
      <br>
      <label for=ttl>Expires after milliseconds</label>
      <br>
      <input type="number" name="ttl" value=900000 min=0 max=2147483647>
      <br>
      <input type="submit" value="Submit">
    </form>
    <table>
      <thead>
        <tr>
          <th>Milliseconds</th>
          <th>Same as</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>60000</td>
          <td>1 minute</td>
        </tr>
        <tr>
          <td>900000</td>
          <td>15 minutes</td>
        </tr>
        <tr>
          <td>3600000</td>
          <td>1 hour</td>
        </tr>
        <tr>
          <td>28800000</td>
          <td>8 hours</td>
        </tr>
        <tr>
          <td>86400000</td>
          <td>1 day</td>
        </tr>
        <tr>
          <td>604800000</td>
          <td>7 day</td>
        </tr>
        <tr>
          <td>2147483647</td>
          <td>
              24.8 days, <br>
              NodeJS upper limit <br>
              on delay time. <br>
              Exceeding value causes <br>
              node to execute <br>
              in 1 ms
          </td>
        </tr>
      </tbody>
    </table>
  `.trim();
  return baseView(view)
}
