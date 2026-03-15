export type Answer = "yes" | "no" | "conditions" | "only-if-distributed";

export interface WizardAnswers {
  commercial: "yes" | "no" | "conditions";
  shareAlike: "yes" | "no" | "only-if-distributed";
  documentChanges: "yes" | "no";
  proprietary: "yes" | "no";
  patentProtection: "yes" | "no";
}

export interface License {
  id: string;
  name: string;
  spdx: string;
  tagline: string;
  eli5: string;
  permissions: string[];
  conditions: string[];
  limitations: string[];
  score?: number;
  whyRecommended?: string;
  popularProjects: { name: string; url: string }[];
  text: string;
}

export const LICENSES: Record<string, License> = {
  mit: {
    id: "mit",
    name: "MIT License",
    spdx: "MIT",
    tagline: "Simple and permissive. Do almost anything.",
    eli5: "You can use my code however you want — sell it, change it, keep it secret — just keep my name on it. That's it.",
    permissions: ["Commercial use", "Modification", "Distribution", "Private use"],
    conditions: ["License and copyright notice"],
    limitations: ["Liability", "Warranty"],
    popularProjects: [
      { name: "React", url: "https://github.com/facebook/react" },
      { name: "Next.js", url: "https://github.com/vercel/next.js" },
      { name: "Vue.js", url: "https://github.com/vuejs/vue" },
      { name: "jQuery", url: "https://github.com/jquery/jquery" },
    ],
    text: `MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,
  },

  apache2: {
    id: "apache2",
    name: "Apache License 2.0",
    spdx: "Apache-2.0",
    tagline: "Permissive with explicit patent protection.",
    eli5: "Like MIT, but with a bonus: if someone uses your code, they can't sue you for patent stuff. Big companies love this one.",
    permissions: ["Commercial use", "Modification", "Distribution", "Private use", "Patent use"],
    conditions: ["License and copyright notice", "State changes", "Notice file"],
    limitations: ["Liability", "Warranty", "Trademark use"],
    popularProjects: [
      { name: "Kubernetes", url: "https://github.com/kubernetes/kubernetes" },
      { name: "TensorFlow", url: "https://github.com/tensorflow/tensorflow" },
      { name: "Android", url: "https://source.android.com" },
      { name: "Swift", url: "https://github.com/apple/swift" },
    ],
    text: `Apache License
Version 2.0, January 2004
http://www.apache.org/licenses/

TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

[Full Apache 2.0 license text — replace with full text from https://www.apache.org/licenses/LICENSE-2.0.txt]

Copyright [yyyy] [name of copyright owner]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.`,
  },

  gpl3: {
    id: "gpl3",
    name: "GNU GPL v3",
    spdx: "GPL-3.0",
    tagline: "Copyleft: share-alike required, patent protection included.",
    eli5: "You can use and change my code, but if you share your version, you MUST share your source code too. No keeping it secret. Also protects against patent trolls.",
    permissions: ["Commercial use", "Modification", "Distribution", "Private use", "Patent use"],
    conditions: ["Disclose source", "License and copyright notice", "Same license", "State changes"],
    limitations: ["Liability", "Warranty"],
    popularProjects: [
      { name: "Linux Kernel", url: "https://github.com/torvalds/linux" },
      { name: "WordPress", url: "https://github.com/WordPress/WordPress" },
      { name: "GIMP", url: "https://gitlab.gnome.org/GNOME/gimp" },
      { name: "Bash", url: "https://www.gnu.org/software/bash/" },
    ],
    text: `GNU GENERAL PUBLIC LICENSE
Version 3, 29 June 2007

Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>

[Full GPL v3 text — see https://www.gnu.org/licenses/gpl-3.0.txt]

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.`,
  },

  lgpl3: {
    id: "lgpl3",
    name: "GNU LGPL v3",
    spdx: "LGPL-3.0",
    tagline: "Copyleft for libraries — allows proprietary linking.",
    eli5: "Like GPL, but if someone just uses your library (without changing it), they don't have to open their code. Great for libraries you want everyone to use.",
    permissions: ["Commercial use", "Modification", "Distribution", "Private use", "Patent use"],
    conditions: ["Disclose source", "License and copyright notice", "Same license (library)", "State changes"],
    limitations: ["Liability", "Warranty"],
    popularProjects: [
      { name: "Qt (LGPL modules)", url: "https://www.qt.io" },
      { name: "GNU C Library", url: "https://www.gnu.org/software/libc/" },
      { name: "FFmpeg", url: "https://ffmpeg.org" },
    ],
    text: `GNU LESSER GENERAL PUBLIC LICENSE
Version 3, 29 June 2007

Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>

[Full LGPL v3 text — see https://www.gnu.org/licenses/lgpl-3.0.txt]

This version of the GNU Lesser General Public License incorporates
the terms and conditions of version 3 of the GNU General Public
License, supplemented by the additional permissions listed below.`,
  },

  mpl2: {
    id: "mpl2",
    name: "Mozilla Public License 2.0",
    spdx: "MPL-2.0",
    tagline: "File-level copyleft. Middle ground between MIT and GPL.",
    eli5: "If you change my files, share those changes. But you can combine my code with your private code in the same project — just keep the files separate.",
    permissions: ["Commercial use", "Modification", "Distribution", "Private use", "Patent use"],
    conditions: ["Disclose source (modified files only)", "License and copyright notice", "Same license (modified files)"],
    limitations: ["Liability", "Warranty", "Trademark use"],
    popularProjects: [
      { name: "Firefox", url: "https://github.com/mozilla/gecko-dev" },
      { name: "Thunderbird", url: "https://github.com/mozilla/releases-comm-central" },
      { name: "LibreOffice", url: "https://github.com/LibreOffice/core" },
    ],
    text: `Mozilla Public License Version 2.0
==================================

[Full MPL 2.0 text — see https://www.mozilla.org/en-US/MPL/2.0/]

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.`,
  },

  bsd2: {
    id: "bsd2",
    name: "BSD 2-Clause License",
    spdx: "BSD-2-Clause",
    tagline: "Like MIT, slightly different wording.",
    eli5: "Very similar to MIT. Use my code however you want, just keep my name on it. Two simple rules.",
    permissions: ["Commercial use", "Modification", "Distribution", "Private use"],
    conditions: ["License and copyright notice"],
    limitations: ["Liability", "Warranty"],
    popularProjects: [
      { name: "FreeBSD", url: "https://github.com/freebsd/freebsd-src" },
      { name: "Redis (older versions)", url: "https://github.com/redis/redis" },
      { name: "Go (some parts)", url: "https://github.com/golang/go" },
    ],
    text: `BSD 2-Clause License

Copyright (c) [year], [fullname]
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.`,
  },

  agpl3: {
    id: "agpl3",
    name: "GNU AGPL v3",
    spdx: "AGPL-3.0",
    tagline: "GPL but also covers network/SaaS use.",
    eli5: "Like GPL, but even if you run my code as a web service (not distributing it), you still have to share your source code. Closes the 'SaaS loophole'.",
    permissions: ["Commercial use", "Modification", "Distribution", "Private use", "Patent use"],
    conditions: ["Disclose source", "License and copyright notice", "Network use = distribution", "Same license", "State changes"],
    limitations: ["Liability", "Warranty"],
    popularProjects: [
      { name: "Mastodon", url: "https://github.com/mastodon/mastodon" },
      { name: "Nextcloud", url: "https://github.com/nextcloud/server" },
      { name: "MongoDB (older)", url: "https://github.com/mongodb/mongo" },
    ],
    text: `GNU AFFERO GENERAL PUBLIC LICENSE
Version 3, 19 November 2007

Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>

[Full AGPL v3 text — see https://www.gnu.org/licenses/agpl-3.0.txt]

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.`,
  },

  unlicense: {
    id: "unlicense",
    name: "The Unlicense",
    spdx: "Unlicense",
    tagline: "Public domain. No restrictions whatsoever.",
    eli5: "I give up all rights to this code. It's yours, it's everyone's. Do literally anything with it. No credit needed.",
    permissions: ["Commercial use", "Modification", "Distribution", "Private use"],
    conditions: [],
    limitations: ["Liability", "Warranty"],
    popularProjects: [
      { name: "youtube-dl (originally)", url: "https://github.com/ytdl-org/youtube-dl" },
      { name: "SQLite (public domain)", url: "https://sqlite.org" },
    ],
    text: `This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the software
to the public domain. We make this dedication for the benefit of the
public at large and to the detriment of our heirs and successors. We
intend this dedication to be an overt act of relinquishment in perpetuity
of all present and future rights to this software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <https://unlicense.org>`,
  },
};

// Compatibility matrix: can licenseA code be used in a project licensed as licenseB?
// "yes" | "no" | "partial"
export const COMPATIBILITY: Record<string, Record<string, "yes" | "no" | "partial">> = {
  mit:       { mit: "yes", apache2: "yes", gpl3: "yes", lgpl3: "yes", mpl2: "yes", bsd2: "yes", agpl3: "yes", unlicense: "yes" },
  apache2:   { mit: "partial", apache2: "yes", gpl3: "yes", lgpl3: "yes", mpl2: "yes", bsd2: "partial", agpl3: "yes", unlicense: "partial" },
  gpl3:      { mit: "no", apache2: "no", gpl3: "yes", lgpl3: "yes", mpl2: "no", bsd2: "no", agpl3: "yes", unlicense: "no" },
  lgpl3:     { mit: "no", apache2: "no", gpl3: "yes", lgpl3: "yes", mpl2: "no", bsd2: "no", agpl3: "yes", unlicense: "no" },
  mpl2:      { mit: "no", apache2: "no", gpl3: "yes", lgpl3: "yes", mpl2: "yes", bsd2: "no", agpl3: "yes", unlicense: "no" },
  bsd2:      { mit: "yes", apache2: "yes", gpl3: "yes", lgpl3: "yes", mpl2: "yes", bsd2: "yes", agpl3: "yes", unlicense: "yes" },
  agpl3:     { mit: "no", apache2: "no", gpl3: "no", lgpl3: "no", mpl2: "no", bsd2: "no", agpl3: "yes", unlicense: "no" },
  unlicense: { mit: "yes", apache2: "yes", gpl3: "yes", lgpl3: "yes", mpl2: "yes", bsd2: "yes", agpl3: "yes", unlicense: "yes" },
};

export function recommendLicenses(answers: WizardAnswers): (License & { score: number; whyRecommended: string })[] {
  const scores: Record<string, { score: number; reasons: string[] }> = {};

  const add = (id: string, pts: number, reason: string) => {
    if (!scores[id]) scores[id] = { score: 0, reasons: [] };
    scores[id].score += pts;
    if (pts > 0) scores[id].reasons.push(reason);
  };

  // Commercial use
  if (answers.commercial === "yes") {
    add("mit", 3, "Fully allows commercial use");
    add("apache2", 3, "Fully allows commercial use");
    add("bsd2", 3, "Fully allows commercial use");
    add("unlicense", 3, "No restrictions at all");
    add("gpl3", 2, "Allows commercial use (with copyleft)");
    add("lgpl3", 2, "Allows commercial use (with copyleft)");
    add("mpl2", 2, "Allows commercial use");
    add("agpl3", 1, "Allows commercial use but requires source disclosure");
  } else if (answers.commercial === "no") {
    add("agpl3", 2, "Discourages commercial use via strong copyleft");
    add("gpl3", 2, "Strong copyleft deters many commercial uses");
  } else {
    add("lgpl3", 3, "Allows commercial use with conditions");
    add("mpl2", 3, "File-level copyleft, flexible for commercial use");
    add("apache2", 2, "Permissive with patent protection");
  }

  // Share-alike
  if (answers.shareAlike === "yes") {
    add("gpl3", 4, "Requires all derivatives to be open source");
    add("agpl3", 4, "Strongest copyleft, covers network use too");
    add("lgpl3", 2, "Requires sharing changes to the library itself");
  } else if (answers.shareAlike === "no") {
    add("mit", 4, "No share-alike requirement");
    add("apache2", 4, "No share-alike requirement");
    add("bsd2", 4, "No share-alike requirement");
    add("unlicense", 4, "No requirements at all");
    add("mpl2", 2, "Only file-level share-alike");
  } else {
    // only-if-distributed
    add("lgpl3", 4, "Only requires sharing if you distribute the library");
    add("mpl2", 4, "Only requires sharing modified files if distributed");
    add("gpl3", 2, "Requires sharing on distribution");
  }

  // Document changes
  if (answers.documentChanges === "yes") {
    add("apache2", 3, "Explicitly requires documenting changes");
    add("gpl3", 2, "Requires noting changes");
    add("lgpl3", 2, "Requires noting changes");
    add("agpl3", 2, "Requires noting changes");
  } else {
    add("mit", 2, "No requirement to document changes");
    add("bsd2", 2, "No requirement to document changes");
    add("unlicense", 3, "Zero requirements");
  }

  // Proprietary software use
  if (answers.proprietary === "yes") {
    add("mit", 4, "Can be used in proprietary software freely");
    add("apache2", 4, "Can be used in proprietary software");
    add("bsd2", 4, "Can be used in proprietary software");
    add("unlicense", 4, "No restrictions on use");
    add("lgpl3", 3, "Can be linked into proprietary software");
    add("mpl2", 2, "Can be combined with proprietary code in separate files");
    add("gpl3", -5, "Cannot be used in proprietary software");
    add("agpl3", -5, "Cannot be used in proprietary software");
  } else {
    add("gpl3", 4, "Prevents use in proprietary software");
    add("agpl3", 4, "Prevents use in proprietary software (including SaaS)");
    add("lgpl3", 2, "Limits proprietary use to linking only");
    add("mpl2", 2, "Limits proprietary use at file level");
    add("mit", -2, "Cannot prevent proprietary use");
    add("apache2", -2, "Cannot prevent proprietary use");
  }

  // Patent protection
  if (answers.patentProtection === "yes") {
    add("apache2", 5, "Explicit patent grant and retaliation clause");
    add("gpl3", 4, "Includes patent protection");
    add("lgpl3", 4, "Includes patent protection");
    add("agpl3", 4, "Includes patent protection");
    add("mpl2", 3, "Includes patent grant");
    add("mit", -1, "No explicit patent protection");
    add("bsd2", -1, "No explicit patent protection");
  } else {
    add("mit", 2, "Simple, no patent complexity");
    add("bsd2", 2, "Simple, no patent complexity");
    add("unlicense", 2, "No legal complexity");
  }

  return Object.entries(scores)
    .map(([id, { score, reasons }]) => ({
      ...LICENSES[id],
      score,
      whyRecommended: reasons.slice(0, 3).join(" · "),
    }))
    .filter((l) => l.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}
