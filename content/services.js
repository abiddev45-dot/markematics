const sectionTitles = [
  ["service-verticals", "Service verticals"],
  ["customized-research", "Customized Research"],
  ["methodologies", "research methodologies"],
  ["analytics", "advance analytics"],
  ["eyeball-tracking", "OUR CREATIVE SOLUTIONS"],
  ["interact", "InterAct 2.0"],
  ["brandtrack", "BRAND TRACK"],
  ["marketsim", "Market Sim — Conjoint Based Market Simulator"],
  ["shoppersights", "ShopperSights"],
  ["stm", "Simulated Test Market Forecasting Model"],
  ["retail-research", "retail Research"],
  ["retail-census", "RETAIL e-CENSUS"],
  ["metrea", "metrea — Your new assistant for Retail Measurement"],
  ["technology", "Technology solutions"],
  ["bicrux", "BICrux"],
  ["win-at-shelf", "Win@Shelf"],
  ["shoptrack", "ShopTrack"],
  ["data-engineering", "Data engineering & Dashboards"],
];

export function parseServicesDocument(source) {
  return source
    .split(/^===== /m)
    .filter(Boolean)
    .map((chunk, index) => {
      const [header = "", ...body] = chunk.trim().split("\n");
      const [id = `service-${index}`, title = header.replace(/ =====$/, "")] =
        sectionTitles[index] ?? [];
      const blocks = body
        .join("\n")
        .trim()
        .split(/\n\s*\n/)
        .filter(Boolean)
        .map((block) => ({
          lines: block
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean),
        }));
      // The source's first heading is displayed as the section heading, not twice.
      if (blocks[0]?.lines[0] === title) {
        blocks[0].lines.shift();
        if (blocks[0].lines.length === 0) blocks.shift();
      }
      return {
        id,
        title,
        slide: header.match(/SLIDES? ([\d–]+)/)?.[1] ?? "",
        blocks,
      };
    });
}
