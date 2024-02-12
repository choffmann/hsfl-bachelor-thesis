# hsfl-bachelor-thesis

## Requirements
### wasm-pack
```bash
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
```

## V8 tools

### Install [depot_tools](https://www.chromium.org/developers/how-tos/install-depot-tools)
```bash
git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git`
```

### Build V8
```bash
fetch v8
cd v8
gclient sync
./tools/dev/gm.py x64.optdebug # Für x64 Systeme
```

