// api/audit.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { missed_calls, admin_hours, charge_per_customer } = req.body;

  if (
    typeof missed_calls !== 'number' ||
    typeof admin_hours !== 'number' ||
    typeof charge_per_customer !== 'number'
  ) {
    return res
      .status(400)
      .json({ error: 'Expected numeric missed_calls, admin_hours, charge_per_customer' });
  }

  const loss    = missed_calls * charge_per_customer;
  const savings = Number((loss * 0.75).toFixed(2));

  return res.status(200).json({ loss, savings });
}
