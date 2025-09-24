import { Product } from '../types/product';

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Akıllı Su Şişesi - LED Göstergeli',
    description: 'Su içme alışkanlığınızı geliştiren, sıcaklık göstergeli ve hatırlatma özelliği bulunan akıllı su şişesi. Günlük su ihtiyacınızı takip edin ve sağlıklı yaşamın tadını çıkarın.',
    price: 299,
    originalPrice: 399,
    currency: '₺',
    images: [
      'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Sağlık & Wellness',
    rating: 4.8,
    reviewCount: 156,
    freeShipping: true,
    variants: [
      {
        id: 'color',
        name: 'Renk',
        options: [
          { id: 'blue', name: 'Mavi', value: 'Mavi', inStock: true },
          { id: 'black', name: 'Siyah', value: 'Siyah', inStock: true },
          { id: 'white', name: 'Beyaz', value: 'Beyaz', inStock: false }
        ]
      },
      {
        id: 'capacity',
        name: 'Kapasite',
        options: [
          { id: '500ml', name: '500ml', value: '500ml', inStock: true },
          { id: '750ml', name: '750ml', value: '750ml', price: 50, inStock: true }
        ]
      }
    ],
    features: [
      'LED sıcaklık göstergesi',
      'Mobil uygulama desteği',
      'BPA-free malzeme',
      '12 saat sıcak/soğuk tutma'
    ],
    inStock: true,
    stockCount: 24
  },
  {
    id: '2',
    name: 'Taşınabilir Mini Bulaşık Makinesi',
    description: 'Küçük mutfaklar için ideal olan kompakt bulaşık makinesi. USB ile çalışır, az su tüketir ve mükemmel temizlik sağlar. Öğrenci evleri ve ofisler için birebir.',
    price: 899,
    originalPrice: 1199,
    currency: '₺',
    images: [
      'https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4239031/pexels-photo-4239031.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Ev & Yaşam',
    rating: 4.6,
    reviewCount: 89,
    freeShipping: false,
    shippingCost: 39,
    variants: [
      {
        id: 'color',
        name: 'Renk',
        options: [
          { id: 'white', name: 'Beyaz', value: 'Beyaz', inStock: true },
          { id: 'grey', name: 'Gri', value: 'Gri', inStock: true }
        ]
      }
    ],
    features: [
      'USB-C ile çalışır',
      'Sessiz çalışma modu',
      '6 kişilik set kapasitesi',
      'Su tasarruflu teknologi'
    ],
    inStock: true,
    stockCount: 15
  },
  {
    id: '3',
    name: 'Kablosuz Şarj Standı 3-in-1',
    description: 'iPhone, Apple Watch ve AirPods için özel tasarlanan kablosuz şarj standı. Masanızı düzenli tutar, hızlı şarj teknolojisi ile cihazlarınızı güvenle şarj eder.',
    price: 449,
    currency: '₺',
    images: [
      'https://images.pexels.com/photos/163117/mobile-phone-android-apps-phone-163117.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Teknoloji',
    rating: 4.9,
    reviewCount: 234,
    freeShipping: true,
    variants: [
      {
        id: 'color',
        name: 'Renk',
        options: [
          { id: 'black', name: 'Siyah', value: 'Siyah', inStock: true },
          { id: 'white', name: 'Beyaz', value: 'Beyaz', inStock: true }
        ]
      }
    ],
    features: [
      '15W hızlı şarj',
      'Yatay/dikey şarj desteği',
      'LED gösterge',
      'Yabancı metal algılama'
    ],
    inStock: true,
    stockCount: 42
  },
  {
    id: '4',
    name: 'Akıllı Bitki Bakım Sistemi',
    description: 'Bitkilerinizin nem, ışık ve sıcaklık seviyelerini otomatik takip eden akıllı sistem. Mobil uygulaması ile uzaktan kontrol edebilir, bitkilerinizi her zaman sağlıklı tutabilirsiniz.',
    price: 599,
    originalPrice: 799,
    currency: '₺',
    images: [
      'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Bahçe & Bitki',
    rating: 4.7,
    reviewCount: 67,
    freeShipping: true,
    variants: [
      {
        id: 'sensors',
        name: 'Sensör Sayısı',
        options: [
          { id: '2sensor', name: '2 Sensör', value: '2 Sensör', inStock: true },
          { id: '4sensor', name: '4 Sensör', value: '4 Sensör', price: 150, inStock: true }
        ]
      }
    ],
    features: [
      'Nem seviye takibi',
      'Işık şiddeti ölçümü',
      'Mobil uygulama',
      'Otomatik sulama uyarısı'
    ],
    inStock: true,
    stockCount: 18
  },
  {
    id: '5',
    name: 'Magnetik Telefon Tutucu - Araç İçi',
    description: 'Güçlü manyetik teknoloji ile telefonunuzu güvenle tutan araç içi tutucu. 360 derece dönebilir, tüm telefon modellerine uyumlu.',
    price: 129,
    originalPrice: 179,
    currency: '₺',
    images: [
      'https://images.pexels.com/photos/1064136/pexels-photo-1064136.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Oto Aksesuar',
    rating: 4.5,
    reviewCount: 312,
    freeShipping: true,
    variants: [
      {
        id: 'mount',
        name: 'Montaj Tipi',
        options: [
          { id: 'dashboard', name: 'Dashboard', value: 'Dashboard', inStock: true },
          { id: 'vent', name: 'Havalandırma', value: 'Havalandırma', inStock: true }
        ]
      }
    ],
    features: [
      '360° dönebilir eklem',
      'Güçlü N52 mıknatıs',
      'Tek elle kullanım',
      'Evrensel uyumluluk'
    ],
    inStock: true,
    stockCount: 87
  },
  {
    id: '6',
    name: 'LED Işıklı Makyaj Aynası',
    description: 'Profesyonel makyaj için ideal olan LED ışıklı ayna. 3 farklı ışık modu, dokunmatik kontroller ve 10x büyütme özelliği ile mükemmel görüntü.',
    price: 249,
    currency: '₺',
    images: [
      'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Güzellik & Bakım',
    rating: 4.8,
    reviewCount: 198,
    freeShipping: true,
    variants: [
      {
        id: 'size',
        name: 'Boyut',
        options: [
          { id: 'small', name: 'Küçük (20cm)', value: 'Küçük', inStock: true },
          { id: 'large', name: 'Büyük (30cm)', value: 'Büyük', price: 100, inStock: true }
        ]
      }
    ],
    features: [
      '3 ışık modu (soğuk/doğal/sıcak)',
      '10x büyütme alanı',
      'Dokunmatik kontrol',
      'USB şarjlı'
    ],
    inStock: true,
    stockCount: 33
  }
];