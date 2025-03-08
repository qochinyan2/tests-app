import { Site } from "@app/scripts/types";

export const clearDomain = (sites: Site[]) => {
  const newSites = [...sites].map((site) => {
    const url = new URL(site.url);
    let domain = url.hostname;

    if (domain.startsWith("www.")) {
      domain = domain.substring(4);
    }
    site = { ...site, url: domain };
    // site.url = domain;
    // return site;
    return site;
  });
  return newSites;
};
