# MAD VISUALS — GitHub Pages Portfolio

A lightweight static portfolio website built with separate HTML, CSS and JavaScript files. It keeps the MAD VISUALS black, white, grey and red palette.

## Folder structure

- `index.html` — page structure
- `css/style.css` — all styling and responsive layout
- `js/main.js` — category filters, project cards, mobile navigation and media lightbox
- `js/projects.js` — the project list and the file paths you edit
- `assets/images/` — upload project cover images here
- `assets/videos/` — upload short MP4 video files here

## Add your own work

1. Open the matching category folder inside `assets/images/`.
2. Upload your image. Use JPG, PNG or WebP. Keep filenames simple, e.g. `bike-rolling-shot.jpg`.
3. Open `js/projects.js`.
4. Find the project you want to update and replace its `thumbnail` value with your exact path.
5. To open a video when a visitor clicks the project, upload an MP4 into the matching `assets/videos/` folder and put its path in `media`.
6. Commit the files to GitHub. GitHub Pages will publish the changes.

### Example

If you upload:
`assets/images/automotive/r15-night-ride.jpg`

Set:
`thumbnail: "assets/images/automotive/r15-night-ride.jpg"`

If you also upload:
`assets/videos/automotive/r15-night-ride.mp4`

Set:
`media: "assets/videos/automotive/r15-night-ride.mp4"`

For an image-only project, keep `media: ""`.

## Project categories

1. Photography
2. Graphic Design
3. Car / Bike Delivery
4. Brand Promotions
5. Automotive
6. Event Edits

Each category has two starter cards. You can rename, duplicate or remove project objects in `js/projects.js`. Keep the category value exactly as one of:
`photography`, `graphic-design`, `car-bike-delivery`, `brand-promotions`, `automotive`, `event-edits`.

## Important video hosting note

GitHub repositories are not intended for large video hosting. Keep individual videos small and compressed if you store them in the repository. For larger videos, upload to YouTube or Vimeo and use an embeddable URL in `media`, for example:
`https://www.youtube.com/embed/VIDEO_ID`

## Publish with GitHub Pages

1. Upload the contents of this folder to the root of your GitHub repository (not the outer ZIP folder).
2. In the repository, open **Settings → Pages**.
3. Select **Deploy from a branch**, choose `main` and `/ (root)`, then Save.
4. Wait for deployment and open your Pages URL.

Google Fonts are loaded online. If a visitor is offline, the site falls back to system fonts.
