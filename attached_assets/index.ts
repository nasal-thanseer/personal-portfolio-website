/* eslint-env browser */

// Borrowed from https://github.com/reslear/dotlottie-player-core/blob/ab9ab866df3f6687111f9317189b83b66c0d19f8/src/fetch.ts#L62
//
// MIT License
//
// Copyright (c) 2022 reslear
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import {unzip, strFromU8} from './fflate.min';
import type {DotLottieManifest, LottieJsonAsset, LottieJson} from './types';

function parseManifest(data: string): DotLottieManifest {
  const manifest: DotLottieManifest = JSON.parse(data);
  if (!('animations' in manifest)) {
    throw new Error('Manifest not found');
  }
  if (manifest.animations.length === 0) {
    throw new Error('No animations listed in the manifest');
  }
  return manifest;
}

function isBytesZip(bytes: ArrayBuffer): boolean {
  // lottie file is a zip file format https://en.wikipedia.org/wiki/List_of_file_signatures
  // @see https://stackoverflow.com/a/66046176
  const b = new Uint8Array(bytes, 0, 32);
  return b[0] === 80 && b[1] === 75 && b[2] === 3 && b[3] === 4;
}

async function fetchRequest(url: string): Promise<ArrayBuffer> {
  return await fetch(new URL(url, window?.location?.href).href).then((r) =>
    r.arrayBuffer()
  );
}

async function base64fromU8(data: Uint8Array): Promise<string> {
  const base64url = await new Promise(
    (
      resolve: (
        result:
          | Promise<null | ArrayBuffer | string>
          | null
          | ArrayBuffer
          | string
      ) => void
    ) => {
      const reader = new FileReader();
      reader.readAsDataURL(new Blob([data]));
      reader.onload = () => resolve(reader.result);
    }
  );

  // @ts-expect-error - TS2322 - Type 'string | undefined' is not assignable to type 'string'.
  return (base64url as string).split(',', 2)[1];
}

async function unZip(buffer: ArrayBuffer): Promise<{
  read: (arg1: string) => string;
  readB64: (arg1: string) => Promise<string>;
}> {
  const file = new Uint8Array(buffer);
  const lottieFile = await new Promise(
    (
      resolve: (result: Promise<never>) => void,
      reject: (error?: Error) => void
    ) => {
      unzip(file, (err: Error, unzipped: any) =>
        err ? reject(err) : resolve(unzipped)
      );
    }
  );

  return {
    // @ts-expect-error - TS2322 - Type 'string | Uint8Array | Uint16Array | Uint32Array' is not assignable to type 'string'.
    read: (path) => strFromU8(lottieFile[path]),
    readB64: async (path) => await base64fromU8(lottieFile[path]),
  };
}

async function prepareLottieAssets(
  lottieJson: LottieJson,
  dotLottie: {
    read: (arg1: string) => string;
    readB64: (arg1: string) => Promise<string>;
  }
) {
  if (!('assets' in lottieJson)) {
    return lottieJson;
  }

  async function parseAsset(asset: LottieJsonAsset) {
    const {p} = asset;

    if (p == null) return asset;
    if (dotLottie.read(`images/${p}`) == null) return asset;

    const ext = p.split('.').pop();
    const assetB64 = await dotLottie.readB64(`images/${p}`);

    // Handles assets that are encoded directly in the JSON
    if (ext?.startsWith('data:')) {
      asset.p = ext;
      asset.e = 1;
      return asset;
    }

    switch (ext) {
      case 'svg':
      case 'svg+xml':
        asset.p = `data:image/svg+xml;base64,${assetB64}`;
        break;
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'webp':
        asset.p = `data:image/${ext};base64,${assetB64}`;
        break;
      default:
        asset.p = `data:;base64,${assetB64}`;
    }

    asset.e = 1;

    return asset;
  }

  const result = await Promise.all(lottieJson.assets.map(parseAsset));

  result.map((asset, i) => {
    lottieJson.assets[i] = asset;
  });

  return lottieJson;
}

/**
 * Given a `.lottie` file as an array buffer, `unZipDotLottie` unzips the file,
 * parses the assets, and then returns the parsed lottie JSON file.
 */
export async function unZipDotLottie(
  response: ArrayBuffer
): Promise<LottieJson> {
  const dotLottie = await unZip(response);
  const manifest = parseManifest(dotLottie.read('manifest.json'));
  const animations = await Promise.all(
    manifest.animations.map((a) => {
      const lottieJson = JSON.parse(dotLottie.read(`animations/${a.id}.json`));
      return prepareLottieAssets(lottieJson, dotLottie);
    })
  );

  // @ts-expect-error - TS2322 - Type 'LottieJson | undefined' is not assignable to type 'LottieJson'.
  return animations[0];
}

/**
 * Given a URL path, `fetchLottie` fetches a `.lottie` file, unzips the file, parses the assets,
 * and then returns the parsed lottie JSON.
 */
export async function fetchLottie(url: string): Promise<LottieJson> {
  const response = await fetchRequest(url);

  if (isBytesZip(response)) {
    return await unZipDotLottie(response);
  }

  const lottieJson = JSON.parse(
    new TextDecoder().decode(response)
  ) as LottieJson;
  return lottieJson;
}
