#!/bin/bash
# Download cafe images from Google Photos URLs

urls=(
"https://lh3.googleusercontent.com/p/AF1QipOfRIx5Z7SAJA9KWtR2EqAQGn91yLrPwapXf28y=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq2-PaRrsd5rKtt8_p-VCggIXsGDSTSgaylanNB7ypvhPW6KE1buZ1BZ8wMAhFkEEIKpcf9NLjk1dPpaDWp1f5ZPtZ0FgTRY5mNNSZp0OWSU8AbXdffB5KUTuBFebDqWNqH4h7t=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AC9h4noGcIeGLZn7gybtWc2qG_vV4duiVsuoH4vn7JSPPgfYpbjQpYaE7t6k4ODDKFhpyktnt9eFv4bDfi8TVrYnGiKAiWAXkPHMru4_7O9fNa9FDQ2g28rwjMdMREss9Pm1ZwvGvbM=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrppPGRX6du7_sBrAObYKulXaHO3o9_UEQqhm94AQozMeJBjdRoXHYmMIiaKI30TyaBSMhUXooFyZ8QRyxGLjUZPGmujzQbOtSFSmZS3k9NuTQLY1Kl6jIclAh2FAPjUiLgJhnh=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqRcVIp-CKnnngnVCh24nuihjTcrYxf1bMMqjOLOsK70hPcVRShN5vrJBz8yPSp7VjcNLYI3Tprcqu-CZlSpuE4uLCXI5u7291PPfjpwqFy23ZWencFD8KtKGczrJiG8byh4i1_tg=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrumnTRhcWFhZPprRSmUv_y269ucyYjB4w5xVkIn1r0YzvK6-lv3kVC3ULItAnliaxTBAb2ljtDWDENTwfl_Xscupsj1Cx24heEl3g2eGCv0yXgCRqMslz6Sul33I7TjfbZL2F2TA=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrWZRTXuBr0uap-tTvfbhna9HEPc0Yk_DI8bVH4E2XGlcj8gNLa5KNxAiSkpWnGGv8oCY8M6-ptFsbjqup1skXYGvoKlL38Q_v7RnOeH0_v0a3XOvWWSfxkw4rGHHZ22L-qd_ruww=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AC9h4noca5s3AIAzzuF_dzkWJsz3CFpEPMea1T1Ea4kRRQPxSsKQieJi_LQZbARB2EMH43xjCWYbpZjDmMjy79l_BWbOLcLluHDrrDRj4ooGaJtgykWV38eHH3g9WxAtiE_K-yU2cKafQg=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq0kOdurprywkDepVW7SOgMY2DXJi7gENdGdRgtPPTvKsdz2Dynqv0ORPEiNIhxxgQ_TnFmvp2bS0WVMDjSt4zLj6pfPH20SVvC6uLpBvMkkFf_8oayV6zzpHe6TrBAWgJ7bqM1=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AC9h4noYKuYaSeJCpcoWpKWSdjQ9iPT1L7mkcIF6HSdpV8mP_msV041u1EraIKX9LcBX1Oxbxwvcz-_weUqhfX3i9-NeaM5xzmwC04geup2ABOUemBxRw_BP_nULyPdzPmdJztXBJwmO=w1920-h1080-k-no"
)

cd source
for i in "${!urls[@]}"; do
  echo "Downloading image $((i+1))..."
  curl -L -o "cafe-image-$((i+1)).jpg" "${urls[$i]}" 2>/dev/null || echo "Failed to download image $((i+1))"
done
cd ..
echo "Download complete!"
