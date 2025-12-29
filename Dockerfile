FROM mcr.microsoft.com/playwright:v1.57.0-jammy

RUN mkdir /app
WORKDIR /app
COPY . /app/

RUN npm install --force
RUN npx playwright install

# docker build -t pw-pageobject-test .
# docker run -it pw-object-test 
# npx playwright test usePageObjects.spec.ts --project=chromium