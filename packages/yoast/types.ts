import { Package, Derived } from "frontity/types";
import Source from "@frontity/source";
import Router from "@frontity/router";

export type YoastSocialDefaults = {
  fb_admins?: string[];
  fbconnectkey?: string;
  facebook_site?: string;
  instagram_url?: string;
  linkedin_url?: string;
  myspace_url?: string;
  og_default_image?: string;
  og_frontpage_title?: string;
  og_frontpage_desc?: string;
  og_frontpage_image?: string;
  opengraph?: boolean;
  pinterest_url?: string;
  pinterestverify?: string;
  "plus-publisher"?: string;
  twitter?: boolean;
  twitter_site?: string;
  twitter_card_type?: string;
  youtube_url?: string;
  google_plus_url?: string;
  fbadminapp?: string;
  googleplus?: boolean;
};

export type YoastMeta = {
  yoast_wpseo_title?: string;
  yoast_wpseo_metadesc?: string;
  yoast_wpseo_canonical?: string;
  yoast_wpseo_facebook_title?: string;
  yoast_wpseo_facebook_description?: string;
  yoast_wpseo_facebook_type?: string;
  yoast_wpseo_facebook_image?: string;
  yoast_wpseo_twitter_title?: string;
  yoast_wpseo_twitter_description?: string;
  yoast_wpseo_twitter_image?: string;
  yoast_wpseo_social_url?: string;
  yoast_wpseo_company_or_person?: string;
  yoast_wpseo_person_name?: string;
  yoast_wpseo_company_name?: string;
  yoast_wpseo_company_logo?: string;
  yoast_wpseo_website_name?: string;
  yoast_wpseo_social_defaults?: YoastSocialDefaults;
};

interface Yoast extends Package {
  name: "@frontity/yoast";
  roots: {
    yoast: React.FC;
  };
  state: {
    source?: Source["state"]["source"];
    router?: Router["state"]["router"];
    frontity?: Package["state"]["frontity"] & {
      title?: string;
      description?: string;
    };
    yoast: {
      title: Derived<Yoast, string>;
      description: Derived<Yoast, string>;
      canonical: Derived<Yoast, string>;
      image: Derived<Yoast, string>;
      facebook?: Derived<
        Yoast,
        {
          title: string;
          description: string;
          type: string;
          image: string;
        }
      >;
      twitter?: Derived<
        Yoast,
        {
          title: string;
          description: string;
          image: string;
        }
      >;
    };
  };
}

export default Yoast;
