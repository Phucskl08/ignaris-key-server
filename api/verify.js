export default function handler(req, res) {

  const VALID_KEYS = [
    {
      key: "IGNARIS-2026-ALPHA",
      expire: "2026-12-31"
    },
    {
      key: "VIP-TEST-9999",
      expire: "2027-01-01"
    }
  ];

  const { key } = req.query;

  if (!key) {
    return res.status(400).json({
      status: "error",
      message: "missing key"
    });
  }

  const found = VALID_KEYS.find(k => k.key === key);

  if (!found) {
    return res.json({
      status: "reject",
      reason: "invalid key"
    });
  }

  const now = new Date();
  const exp = new Date(found.expire);

  if (now > exp) {
    return res.json({
      status: "expired",
      expire: found.expire
    });
  }

  return res.json({
    status: "ok",
    expire: found.expire,
    product: "Ignaris MD5 Analyzer"
  });
}
