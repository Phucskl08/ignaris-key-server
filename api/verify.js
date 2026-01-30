export default function handler(req, res) {
  const key = req.query.key;
  const device = req.query.device || "";
  const origin = req.headers.origin || "";
  const ip =
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    "unknown";

  // ❌ thiếu key
  if (!key) {
    return res.json({ status: "error", message: "missing key" });
  }

  // 🔒 khóa domain
  if (
    origin &&
    !origin.includes("svippp.pages.dev")
  ) {
    return res.json({
      status: "blocked",
      reason: "domain"
    });
  }

  // 🔐 DATABASE GIẢ (RAM)
  if (!global.KEY_DB) {
    global.KEY_DB = {
      "VIP-123": {
        expire: 1760000000000,
        device: null
      },
      "VIP-456": {
        expire: 1765000000000,
        device: null
      },
      "NOIRSKY-VIP": {
        expire: 1890000000000,
        device: null
      }
    };
  }

  const data = global.KEY_DB[key];

  // ❌ key sai
  if (!data) {
    return res.json({
      status: "reject",
      reason: "invalid key"
    });
  }

  // ⏰ hết hạn
  if (Date.now() > data.expire) {
    return res.json({
      status: "expired"
    });
  }

  // 🔐 bind thiết bị
  if (data.device === null) {
    data.device = device;
  } else if (data.device !== device) {
    return res.json({
      status: "reject",
      reason: "device mismatch"
    });
  }

  // ✅ hợp lệ
  return res.json({
    status: "success",
    expire: data.expire,
    ip: ip
  });
}      status: "expired",
      expire: found.expire
    });
  }

  return res.json({
    status: "ok",
    expire: found.expire,
    product: "Ignaris MD5 Analyzer"
  });
}
