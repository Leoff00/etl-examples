# etl-ex

To install dependencies:

```bash
bun install
```

To run (need terraform and aws cli installed locally):

```Makefile
make build
```

to run the docker compose localstack and create the s3 bucket with terraform

Run:

```bash
bun pop
```

to populate the tables

and then:

```bash
bun s3
```

To select the tables, save and send to S3.

> type:

```bash
make see_content
```

to download and check out the json file from s3
