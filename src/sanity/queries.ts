export const homePageQuery = `
  *[_type == "homePage"][0]{
    _id,
    title,
    "slug": slug.current,
    hero{
      tagline,
      headline,
      subheadline,
      "backgroundImageUrl": backgroundImage.asset->url,
      ctas[]{label, href}
    },
    featuredMusic{
      title,
      subtitle,
      "coverImageUrl": coverImage.asset->url,
      releaseType,
      year,
      tracks
    },
    latestVideo{
      title,
      "thumbnailUrl": thumbnail.asset->url,
      videoUrl
    },
    upcomingShows[]{date, venue, city, ticketUrl},
    newsletter{
      headline,
      description,
      "backgroundImageUrl": backgroundImage.asset->url
    }
  }
`;

export const aboutPageQuery = `
  *[_type == "aboutPage"][0]{
    _id,
    title,
    heroHeading,
    "heroBackgroundImageUrl": heroBackgroundImage.asset->url,
    "portraitImageUrl": portraitImage.asset->url,
    heading,
    bio,
    accolades,
    pressQuote,
    pressAttribution
  }
`;

export const bookingPageQuery = `
  *[_type == "bookingPage"][0]{
    _id,
    title,
    heroHeading,
    heroSubheading,
    "heroBackgroundImageUrl": heroBackgroundImage.asset->url,
    contactInfo{
      email,
      phone,
      location,
      whatsAppUrl
    },
    eventTypes,
    quoteCard{
      headline,
      quote,
      signature,
      note
    }
  }
`;

export const contactPageQuery = `
  *[_type == "contactPage"][0]{
    _id,
    title,
    heroHeading,
    contactInfo{
      email,
      phone,
      location
    },
    socialLinks[]{label, href}
  }
`;

export const epkPageQuery = `
  *[_type == "epkPage"][0]{
    _id,
    title,
    heroHeading,
    heroSubheading,
    "heroBackgroundImageUrl": heroBackgroundImage.asset->url,
    "pressKitPdfUrl": pressKitPdf.asset->url,
    biography{
      "portraitImageUrl": portraitImage.asset->url,
      body
    },
    pressImages[]{
      "url": asset->url
    },
    featuredTrack{
      title,
      label,
      "coverImageUrl": coverImage.asset->url,
      audioUrl
    },
    achievements
  }
`;

export const fanClubPageQuery = `
  *[_type == "fanClubPage"][0]{
    _id,
    title,
    heroHeading,
    heroDescription,
    "heroBackgroundImageUrl": heroBackgroundImage.asset->url,
    perks[]{title, description},
    ctaHeading
  }
`;

export const galleryPageQuery = `
  *[_type == "galleryPage"][0]{
    _id,
    title,
    heroHeading,
    images[]{
      "url": asset->url
    }
  }
`;

export const musicPageQuery = `
  *[_type == "musicPage"][0]{
    _id,
    title,
    heroHeading,
    heroSubheading,
    albums[]{
      title,
      type,
      year,
      "coverImageUrl": coverImage.asset->url,
      tracks
    }
  }
`;

export const showsPageQuery = `
  *[_type == "showsPage"][0]{
    _id,
    title,
    heroHeading,
    heroSubheading,
    "heroBackgroundImageUrl": heroBackgroundImage.asset->url,
    shows[]{
      type,
      venue,
      date,
      city,
      "imageUrl": image.asset->url,
      ticketUrl
    }
  }
`;

export const storePageQuery = `
  *[_type == "storePage"][0]{
    _id,
    title,
    heroHeading,
    heroSubheading,
    products[]{
      name,
      price,
      "imageUrl": image.asset->url,
      productUrl
    }
  }
`;

export const videosPageQuery = `
  *[_type == "videosPage"][0]{
    _id,
    title,
    heroHeading,
    heroSubheading,
    videos[]{
      title,
      venue,
      "thumbnailUrl": thumbnail.asset->url,
      videoUrl
    }
  }
`;

export const notFoundPageQuery = `
  *[_type == "notFoundPage"][0]{
    _id,
    title,
    heading,
    message,
    ctaLabel,
    ctaHref
  }
`;
