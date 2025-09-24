# LifeStyle - Shopify Liquid Theme

Modern ve kullanıcı dostu bir Shopify teması. Günlük hayatı kolaylaştıran ürünler satan mağazalar için özel olarak tasarlanmıştır.

## Özellikler

### 🎨 Tasarım
- Modern ve temiz tasarım
- Responsive (mobil, tablet, masaüstü uyumlu)
- Smooth animasyonlar ve hover efektleri
- Profesyonel renk paleti

### 🛍️ E-ticaret Özellikleri
- Gelişmiş ürün kartları
- Hızlı görüntüleme (Quick View)
- Favori ürünler sistemi
- Gelişmiş arama ve filtreleme
- Sepet işlemleri
- Ürün varyasyonları desteği

### 📱 Kullanıcı Deneyimi
- Hızlı yükleme süreleri
- SEO optimizasyonu
- Erişilebilirlik standartları
- Kolay navigasyon
- Mobil-first yaklaşım

### ⚙️ Yönetim Paneli
- Kolay tema özelleştirme
- Renk ve font ayarları
- Logo ve favicon yükleme
- Sosyal medya entegrasyonu
- Kargo ayarları

## Kurulum

1. Bu dosyaları bir ZIP arşivi olarak indirin
2. Shopify Admin panelinde **Online Store > Themes** bölümüne gidin
3. **Upload theme** butonuna tıklayın
4. ZIP dosyasını yükleyin
5. Tema yüklendikten sonra **Customize** butonuna tıklayarak özelleştirin

## Tema Yapısı

```
├── assets/           # CSS, JS ve görsel dosyalar
├── config/           # Tema ayarları
├── layout/           # Ana layout dosyaları
├── sections/         # Yeniden kullanılabilir bölümler
├── snippets/         # Küçük kod parçacıkları
├── templates/        # Sayfa şablonları
└── README.md
```

## Özelleştirme

### Renkler
Tema ayarlarından ana renkleri değiştirebilirsiniz:
- Ana renk (Primary)
- İkincil renk (Secondary)
- Vurgu rengi (Accent)
- Arkaplan renkleri

### Tipografi
- Başlık fontu
- Gövde fontu
- Font boyutu ayarları

### Logo ve Branding
- Logo yükleme
- Favicon ayarlama
- Sosyal medya linkleri

## Geliştirici Notları

### CSS Değişkenleri
Tema CSS değişkenleri kullanır:
```css
--color-primary: 37, 99, 235;
--color-secondary: 245, 158, 11;
--font-body-family: 'Assistant', sans-serif;
```

### JavaScript
- Vanilla JavaScript kullanılır
- Modern ES6+ syntax
- Event delegation pattern
- Local storage desteği

### Performans
- Lazy loading görseller
- Minified CSS/JS
- Optimized images
- Browser caching

## Destek

Tema ile ilgili sorularınız için:
- GitHub Issues
- E-posta: support@lifestyle-theme.com
- Dokümantasyon: [tema-docs.com]

## Lisans

Bu tema MIT lisansı altında dağıtılmaktadır.

## Changelog

### v1.0.0
- İlk sürüm
- Temel e-ticaret özellikleri
- Responsive tasarım
- Admin panel entegrasyonu