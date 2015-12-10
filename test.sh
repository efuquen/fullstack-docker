#!/bin/bash
hello_html=$(curl http://192.168.99.101:3000/hello)
if [[ "$hello_html" != "<h1>Hello, world!</h1>" ]]; then
  exit 1
fi

exit 0
