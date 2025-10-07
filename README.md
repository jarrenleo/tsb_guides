# TSB Guides Discord Bot

A Discord bot that automatically generates and posts Nike/SNKRS product release guides for sneaker communities. Fetches real-time product data from Nike's API and distributes region-specific release information to dedicated Discord channels.

## Features

- **Command-based interface**: Use `!guide [SKU] [COUNTRY]` to fetch product guides
- **Multi-region support**: US, EU (NL), JP, KR, AU, and global regions
- **Nike API integration**: Retrieves product data from SNKRS and Nike.com channels
- **Rich Discord embeds**: Formatted embeds with comprehensive product details:
  - Product name, image, and URL
  - Release date/time (Unix timestamp)
  - Launch method (FCFS, DAN with duration, LEO, etc.)
  - Pricing information (including discounts)
  - SKU and country codes
- **Batch processing**: Handle multiple SKUs and countries in a single command
- **Region-specific webhooks**: Automatically routes guides to appropriate regional channels
- **Duplicate filtering**: Ensures unique products by style/color code
- **Error handling**: Clear feedback for unsupported countries or missing products

### Command Examples

Fetch a single product guide:

```
!guide DV3808-200 US
```

Fetch multiple products:

```
!guide DV3808-200 FD0736-100 US
```

Fetch across multiple regions:

```
!guide DV3808-200 US NL JP
```

Batch query multiple products and regions:

```
!guide DV3808-200 FD0736-100 US NL JP KR
```

### Supported Country Codes

- `US` - United States
- `NL` - Netherlands (EU)
- `JP` - Japan
- `KR` - South Korea
- `AU` - Australia
- And other Nike-supported regions

## How It Works

1. Bot listens for messages starting with `!guide`
2. Parses SKUs (>2 characters) and country codes (2 characters) from the command
3. Fetches product data from Nike's API for each SKU/country combination
4. Filters duplicates by style/color code
5. Formats data into rich Discord embeds
6. Routes embeds to appropriate regional webhooks
7. Sends confirmation or error message to the user
