"""
Noto Serif KR → 한글 장평·자간을 줄인 웹폰트 생성

  python build-condensed-kr-font.py <NotoSerifKR[wght].ttf> <출력 .woff2>

- 굵기 WEIGHT 하나로 고정
- 한글 2,350자(KS X 1001) + 한글 호환 자모(입력 중 조합 글자) + 한국어 문장부호만 포함
- 글자를 가로 SCALE_X 배로 줄이고, 글자 사이를 TRACKING(em 비율)만큼 좁힘
- 수정본이므로 서체 이름을 바꿈 (SIL OFL 1.1)

필요 패키지: pip install fonttools brotli
"""

import sys

from fontTools.pens.transformPen import TransformPen
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.subset import Options, Subsetter
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

WEIGHT = 400
SCALE_X = 0.8  # 장평 80%
TRACKING = -0.04  # 자간 -4% (em 기준)
FAMILY = "Noto Serif KR Condensed"


def ks_x_1001_hangul():
    """KS X 1001 완성형 한글 2,350자"""
    chars = []
    for lead in range(0xB0, 0xC9):
        for trail in range(0xA1, 0xFF):
            try:
                chars.append(bytes([lead, trail]).decode("euc-kr"))
            except UnicodeDecodeError:
                pass
    return chars


def main(src, dst):
    font = TTFont(src)
    font = instantiateVariableFont(font, {"wght": WEIGHT})

    unicodes = {ord(c) for c in ks_x_1001_hangul()}
    unicodes |= set(range(0x3131, 0x318F))  # 호환 자모 ㄱ~ㅣ
    unicodes |= set(range(0x3000, 0x3004)) | set(range(0x3008, 0x3012))  # 「」『』〈〉 등

    options = Options()
    options.flavor = None
    options.hinting = False
    options.layout_features = []
    options.name_IDs = ["*"]
    options.drop_tables += ["vhea", "vmtx", "VORG", "BASE"]
    subsetter = Subsetter(options)
    subsetter.populate(unicodes=unicodes)
    subsetter.subset(font)

    upem = font["head"].unitsPerEm
    track = TRACKING * upem
    glyf = font["glyf"]
    hmtx = font["hmtx"]
    glyph_set = font.getGlyphSet()

    for name in font.getGlyphOrder():
        advance, _ = hmtx[name]
        new_advance = max(0, round(advance * SCALE_X + track))
        # 줄어든 글자를 새 글자 폭의 가운데에 둠
        shift = (new_advance - advance * SCALE_X) / 2
        pen = TTGlyphPen(glyph_set)
        glyph_set[name].draw(TransformPen(pen, (SCALE_X, 0, 0, 1, shift, 0)))
        new_glyph = pen.glyph()
        new_glyph.recalcBounds(glyf)
        glyf[name] = new_glyph
        hmtx[name] = (new_advance, getattr(new_glyph, "xMin", 0))

    name_table = font["name"]
    for record in list(name_table.names):
        if record.nameID in (1, 4, 16):
            name_table.setName(FAMILY, record.nameID, record.platformID, record.platEncID, record.langID)
        elif record.nameID == 6:
            name_table.setName(FAMILY.replace(" ", "") + "-Regular", 6, record.platformID, record.platEncID, record.langID)

    font.flavor = "woff2"
    font.save(dst)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
