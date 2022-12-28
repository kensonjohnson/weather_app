export const ICON_MAP: Map<number, string> = new Map();
addMapping([200, 201, 202, 210, 211, 212, 221, 230, 231, 232], "thunderstorm");
addMapping([300, 301, 310, 311, 313, 321, 500, 501, 520, 521], "rain");
addMapping([302, 312, 314, 502, 503, 504, 522, 531], "heavy-rain");
addMapping(
  [511, 600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
  "snow"
);
addMapping([701, 711, 721, 731, 741, 751, 761, 762, 771, 781], "fog");
addMapping([800], "sun-light");
addMapping([801, 802], "cloud-sunny");
addMapping([803, 804], "cloud");

function addMapping(values: number[], icon: string) {
  values.forEach((value) => {
    ICON_MAP.set(value, icon);
  });
}
