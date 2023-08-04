# Chat With PDF

```bash
gcloud builds submit --tag gcr.io/danalitic-gdg-cloud-cogniwonk/chat-with-pdf  --project=danalitic-gdg-cloud-cogniwonk
```

```bash
gcloud run deploy --image gcr.io/danalitic-gdg-cloud-cogniwonk/chat-with-pdf --platform managed  --project=danalitic-gdg-cloud-cogniwonk --allow-unauthenticated
```