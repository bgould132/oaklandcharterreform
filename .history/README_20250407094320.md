# Oakland Charter Reform Project Website

A static website for the Oakland Charter Reform Project to inform Oakland residents about charter reform initiatives.

## Features

- Responsive design for all device sizes
- Accessibility compliant with WCAG 2.1 AA standards
- Fast-loading static site
- Mobile-friendly navigation
- Clear sections explaining the charter reform initiative

## Local Development

To run this site locally:

1. Clone this repository
2. Open `index.html` in your browser
3. Any changes to HTML, CSS, or JavaScript files will be reflected when you refresh the browser

## Deployment to GitHub Pages

### Option 1: Using the GitHub UI

1. Go to your GitHub repository
2. Click on "Settings"
3. Scroll down to the "GitHub Pages" section
4. Under "Source", select the branch you want to deploy (usually `main` or `master`)
5. Click "Save"
6. Your site will be published at `https://[your-username].github.io/[repository-name]/`

### Option 2: Using GitHub Actions

1. Create a `.github/workflows` directory in your repository
2. Add a file named `deploy.yml` with the following content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main  # or master, depending on your default branch

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@4.1.4
        with:
          branch: gh-pages  # The branch the action should deploy to
          folder: .         # The folder the action should deploy
```

3. Push this file to your repository
4. GitHub Actions will automatically deploy your site whenever you push to the main branch

## File Structure

```
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   └── main.js             # JavaScript functionality
├── images/
│   ├── Downtown/           # Downtown Oakland images
│   ├── Cranes/             # Oakland crane images
│   └── logo/               # Project logo
└── project_management/     # Project documentation
```

## Customization

- **Colors**: Edit CSS variables in the `:root` section of `css/styles.css`
- **Content**: Update text in `index.html`
- **Images**: Replace images in the `images` directory, then update references in `index.html`

## Browser Support

This site is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## License

Copyright © 2025 Oakland Charter Reform Project. All rights reserved.

## Contact

For questions or suggestions, please contact:
- Email: oaklandcharterreformproject@gmail.com 