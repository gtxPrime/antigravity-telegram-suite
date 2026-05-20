<div align="center">

# 🤖 Antigravity Telegram Suite

**Hem [Antigravity Standalone App](https://antigravity.google/)\* hem de [Antigravity IDE](https://antigravity.google/) ile çalışır.**

🌍 Diller: [English](README.md) | [Türkçe](README.tr.md) | [Deutsch](README.de.md) | [Español](README.es.md) | [Français](README.fr.md)

Antigravity yapay zeka ajanınızı Telegram üzerinden uzaktan kontrol edin.
Mesaj gönderin, yapay zeka modellerini değiştirin, çalışma alanlarını yönetin, ekran görüntüsü alın ve çoklu ajan iş akışlarını çalıştırın — hepsini telefonunuzdan yapın.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-green.svg)](https://nodejs.org)
[![Platform](https://img.shields.io/badge/Platform-Linux%20%7C%20macOS%20%7C%20Windows-lightgrey.svg)]()
[![Version](https://img.shields.io/badge/Version-3.1.0-orange.svg)]()

\* *Bazı özelliklerin Standalone (Bağımsız) uygulamada kısıtlamaları olabilir. Bkz: [Known Issues (Bilinen Sorunlar)](#-bilinen-sorunlar-known-issues).*

</div>

---

## ✨ Özellikler

| Özellik | Açıklama |
|---|---|
| 💬 **Headless Chat** | Telegram üzerinden yapay zeka ajanına doğrudan mesaj gönderin |
| 📎 **Dosya ve Görsel Yükleme** | Ajanınıza açıklamalarla birlikte dosya/görsel iletin |
| 📸 **IDE Ekran Görüntüsü** | Uzaktan IDE'nin ekran görüntüsünü alın |
| 🤖 **Model Değiştirme** | Yapay zeka modellerini (Gemini, Claude, GPT) butonlarla kolayca değiştirin |
| 📂 **Dosya Gezgini** | Proje dosyalarına göz atın, gezinin ve indirin |
| 🔄 **Çalışma Alanı Yönetimi** | Klavyeye dokunmadan projeler arasında geçiş yapın |
| 🪟 **Çoklu Pencere Desteği** | Birden fazla IDE penceresi açıkken komutları belirli bir pencereye yönlendirin |
| 💬 **Sohbet (Thread) Yönetimi** | Sohbet konularını listeleyin, geçiş yapın ve yönetin |
| ⚡ **Oto-Onay (Auto-Accept)** | DOM MutationObserver ile Run, Accept, Allow, Continue butonlarına otomatik tıklar |
| 🚀 **Turbo Mod** | Çoklu ajan orkestrasyonu: Claude planlar → Gemini kodlar → Claude inceler → Gemini düzeltir |
| 🔄 **Otomatik Güncelleme** | Güncellemeleri kontrol edin ve tek komutla güncelleyin |
| 🌐 **Çoklu Dil Desteği** | 5 dil desteklenmektedir: İngilizce, Türkçe, Almanca, İspanyolca, Fransızca |
| ⌨️ **Yazıyor Göstergesi** | Ajan çalışırken Telegram'da "yazıyor..." durumunu gösterir |
| 🖥️ **Çapraz Platform** | Linux, macOS (Intel & Apple Silicon) ve Windows üzerinde çalışır |
| 🔀 **Çift Uygulama Desteği** | Antigravity IDE ve Standalone Agent uygulaması arasında sorunsuz geçiş yapın |

---

## 🚀 Hızlı Başlangıç

### Gereksinimler

- [Node.js](https://nodejs.org/) >= 18
- [Antigravity IDE](https://antigravity.google/) ve/veya [Antigravity Standalone App](https://antigravity.google/) yüklü olmalı
- Bir Telegram bot token'ı ([@BotFather](https://t.me/BotFather)'dan alabilirsiniz)

### 1. Klonla & Kur

```bash
git clone https://github.com/emreturkmencom/antigravity-telegram-suite.git
cd antigravity-telegram-suite
npm install
```

### 2. Yapılandırma

```bash
cp .env.example .env
```

`.env` dosyasını kendi ayarlarınıza göre düzenleyin:

```env
# Telegram
BOT_TOKEN=sizin_telegram_bot_tokeniniz
ALLOWED_CHAT_ID=sizin_chat_id_niz

# CDP Hata Ayıklama Portları (başlatılırken kullanılan --remote-debugging-port ile aynı olmalıdır)
AGENT_CDP_PORT=9333    # Standalone Antigravity App için port
IDE_CDP_PORT=9334      # Antigravity IDE için port

# Yeni sohbette seçilecek varsayılan yapay zeka modeli
DEFAULT_MODEL=Gemini 3.1 Pro (High)

# Dil: en | tr | de | es | fr
LANGUAGE=tr

# Tercih edilen uygulama hedefi: 'agent' (Standalone) veya 'ide' (IDE)
ANTIGRAVITY_PREFERRED_APP=ide

# Oto-onay varsayılan olarak etkinleştirilsin
AUTOACCEPT_DEFAULT=true
```

> 💡 Chat ID'nizi öğrenmek için botunuza `/start` mesajı gönderebilirsiniz.

### 3. Uygulamayı CDP ile Başlatın

Bot, Antigravity ile Chrome DevTools Protocol (CDP) üzerinden iletişim kurar. Uygulamayı bir hata ayıklama (debugging) portu ile başlatmalısınız.

**İki uygulamayı aynı anda çalıştırıyorsanız, farklı portlar kullanın:**

```bash
# --- Standalone Antigravity App ---
# Linux
antigravity --remote-debugging-port=9333

# macOS
open -a Antigravity --args --remote-debugging-port=9333

# Windows
Antigravity.exe --remote-debugging-port=9333
```

```bash
# --- Antigravity IDE ---
# Linux
antigravity-ide --remote-debugging-port=9334

# macOS
open -a "Antigravity IDE" --args --remote-debugging-port=9334

# Windows
"Antigravity IDE.exe" --remote-debugging-port=9334
```

> ⚠️ Port numaraları `.env` dosyanızdaki `AGENT_CDP_PORT` ve `IDE_CDP_PORT` ile eşleşmelidir.

### 4. Botu Başlatın

```bash
npm start
```

PM2 ile 7/24 çalışması için:

```bash
npm install -g pm2
pm2 start src/index.js --name antigravity-bot
pm2 save
pm2 startup
```

### Otomatik Kurulum (İsteğe Bağlı)

```bash
# Linux & macOS
bash scripts/install.sh

# Windows (PowerShell)
powershell -ExecutionPolicy Bypass -File scripts\install.ps1
```

---

## 📱 Komutlar

### Temel Komutlar

| Komut | Açıklama |
|---|---|
| *(herhangi bir metin)* | Yapay zeka ajanına doğrudan gönderir |
| `/latest` | Ajanın verdiği son cevabı metin olarak getirir |
| `/screenshot` | Aktif ajan penceresinin ekran görüntüsünü alır |
| `/status` | Sistem durumunu gösterir (IDE, CDP bağlantısı, Bot) |
| `/stop` | Çalışan ajanı durdurur |
| `/new` | Yeni bir sohbet (chat session) başlatır |

### Yapay Zeka Modeli & Ajan

| Komut | Açıklama |
|---|---|
| `/model` | Yapay zeka modelini değiştirir (Gemini, Claude, vb.) |
| `/turbo` | **Turbo Modu** açar/kapatır — çoklu ajan orkestrasyonu (aşağıya bakın) |
| `/agents` | Sohbet konularını (thread) listeler ve değiştirir |
| `/quota` | Yapay zeka kredilerini ve model kota kullanımını gösterir |

### Uygulama & Pencere Yönetimi

| Komut | Açıklama |
|---|---|
| `/start_ide` | Antigravity IDE'yi uzaktan başlatır |
| `/start_ag` | Standalone Antigravity Ajan uygulamasını başlatır |
| `/close_ide` | Antigravity IDE'yi kapatır |
| `/close_ag` | Standalone Ajan uygulamasını kapatır |
| `/close` | Şu anki aktif uygulamayı kapatır |
| `/app` | IDE ve Standalone Ajan arasında geçiş yapar (`ANTIGRAVITY_PREFERRED_APP`) |
| `/window` | Birden fazla IDE penceresi açıkken belirli bir pencereyi seçer |
| `/workspace` | Proje çalışma alanını (workspace) değiştirir |
| `/restart` | Bot işlemini yeniden başlatır (PM2) |

### Dosyalar & Araçlar

| Komut | Açıklama |
|---|---|
| `/file` | Proje dosyalarını gezer ve indirir |
| `/artifacts` | Mevcut konudaki (thread) artifact'leri listeler ve indirir |
| `/autoaccept` | Oto-onay özelliğini açar / kapatır / durumunu gösterir |
| `/lang` | Görüntüleme dilini değiştirir |
| `/update` | Güncellemeleri kontrol eder ve botu otomatik günceller |
| `/version` | Mevcut versiyon bilgisini gösterir |
| `/menu` | Telegram komut menüsünü günceller |
| `/fix_shortcuts` | Antigravity uygulamaları için masaüstü kısayollarını onarır |

---

## 🚀 Turbo Mod (Çoklu Ajan Orkestrasyonu)

Turbo Mod, birden fazla yapay zeka modelini otomatik olarak koordine eden bir **Agents Council (Ajan Konseyi)** iş akışı çalıştırır:

```
┌─────────────────────────────────────────────────────────────────────┐
│                          TURBO MOD BORU HATTI                       │
│                                                                     │
│  Faz 1: PLANLAMA          Claude Opus → Uygulama planı oluşturur    │
│  Faz 2: KODLAMA           Gemini Pro  → Kodu yazar                  │
│  Faz 3: İNCELEME          Claude Opus → Güvenlik ve kod incelemesi  │
│  Faz 4: DÜZELTME (Gerekirse) Gemini Pro → Bulunan hataları düzeltir │
│  Faz 5: ÖZET              Gemini Pro  → Kullanıcı için yönetici özeti│
└─────────────────────────────────────────────────────────────────────┘
```

**Nasıl kullanılır:**
1. Turbo Modu etkinleştirin: `/turbo` → "Etkinleştir"i (Enable) seçin
2. İsteğinizi normal metin olarak gönderin
3. Bot otomatik olarak modelleri değiştirecek ve tüm fazları çalıştıracaktır
4. Gerçek zamanlı faz güncellemelerini ve nihai bir özet alacaksınız

> 💡 Turbo Mod, Antigravity aboneliğinizde hem Claude hem de Gemini modellerine erişim gerektirir.

---

## 🏗️ Mimari

```
antigravity-telegram-suite/
├── src/
│   ├── index.js              # Ana bot mantığı ve Telegram komut işleyicileri
│   ├── cdp_controller.js     # Chrome DevTools Protocol iletişimi
│   ├── autoaccept.js         # CDP MutationObserver üzerinden otomatik onay tıklayıcısı
│   ├── turbo_orchestrator.js # Çoklu ajan Turbo Mod (Ajan Konseyi) orkestrasyonu
│   ├── updater.js            # Kendi kendini güncelleme modülü (git pull + pm2 restart)
│   ├── ui_locators.js        # IDE/Ajan arayüz etkileşimi için DOM element seçicileri
│   ├── i18n.js               # Çoklu dil (i18n) modülü
│   └── platform.js           # Çapraz platform OS soyutlaması (başlatma, kapatma, yollar)
├── locales/
│   ├── en.json               # İngilizce
│   ├── tr.json               # Türkçe
│   ├── de.json               # Almanca
│   ├── es.json               # İspanyolca
│   └── fr.json               # Fransızca
├── scripts/
│   ├── install.sh            # Linux/macOS kurucusu
│   └── install.ps1           # Windows kurucusu
├── .env.example              # Ortam değişkenleri taslağı
├── CHANGELOG.md              # Sürüm geçmişi
└── package.json
```

### Nasıl Çalışıyor?

```
┌──────────┐     Telegram API     ┌──────────────┐     CDP (WebSocket)     ┌─────────────────┐
│ Telegram │ ◄──────────────────► │ Antigravity  │ ◄────────────────────► │ Antigravity IDE  │
│ Uygulama │     Bot Komutları    │     Bot      │    DOM Etkileşimi      │       veya       │
└──────────┘                      └──────────────┘                        │ Standalone Ajan  │
                                                                          └─────────────────┘
```

1. Telegram üzerinden bir mesaj gönderirsiniz.
2. Bot, metni CDP aracılığıyla yapay zeka ajanının sohbet girişine enjekte eder.
3. Bot, ajanın tamamlanmasını bekler (bu sırada Telegram'da "yazıyor..." görünür).
4. İşlem bittiğinde, yanıt çıkarılır ve Telegram'a geri gönderilir.
5. **Oto-Onay**: Etkinleştirildiğinde, bir MutationObserver Run, Accept, Allow, Continue butonlarını izler ve otomatik olarak tıklar.

### Çift Uygulama Mimarisi

Bot, aynı anda çalışan **iki Antigravity uygulamasını** destekler:

| Uygulama | Varsayılan Port | Ayar Anahtarı | Açıklama |
|-----|-------------|------------|-------------|
| **Standalone Ajan** | `9333` | `AGENT_CDP_PORT` | Sohbet odaklı hafif Antigravity uygulaması |
| **Antigravity IDE** | `9334` | `IDE_CDP_PORT` | Editör, terminal ve eklentileri olan tam IDE |

Botun odağını uygulamalar arasında değiştirmek için `/app` komutunu kullanın. `.env` dosyasındaki `ANTIGRAVITY_PREFERRED_APP` ayarı botun varsayılan olarak hangi uygulamayı hedeflediğini belirler.

---

## 🌐 Yeni Bir Dil Eklemek

1. `locales/en.json` dosyasını `locales/xx.json` olarak kopyalayın.
2. Tüm metin değerlerini çevirin.
3. `.env` dosyasında `LANGUAGE=xx` ayarını yapın.

---

## ⚠️ Bilinen Sorunlar (Known Issues)

| Sorun | Detaylar |
|-------|---------|
| **Standalone App Kısıtlamaları** | Bazı özellikler (çalışma alanı değiştirme, konu/thread yönetimi) Standalone Antigravity App ile güvenilir şekilde çalışmayabilir. **Antigravity IDE tam olarak desteklenmektedir ve önerilir.** |
| **IDE 2.0'da Otomatik Güncelleme** | Eğer Antigravity IDE otomatik olarak güncellenirse, DOM seçicileri bot da güncellenene kadar kırılabilir. |
| **Turbo Mod Model Erişimi** | Turbo Mod hem Claude hem de Gemini modellerinin mevcut olmasını gerektirir. Modellerden biri kullanılamıyorsa, boru hattı başarısız olur. |

> 💡 Bir geliştirici olarak, IDE desteğine odaklanmayı tercih ediyorum. Standalone App entegrasyonu "elverişli olduğu ölçüde" (best-effort) sağlanmaktadır.

---

## 🤝 Katkıda Bulunma

1. Repoyu fork'layın
2. Yeni özellik dalı oluşturun (`git checkout -b feature/harika-ozellik`)
3. Değişikliklerinizi commit'leyin (`git commit -m 'Harika özellik eklendi'`)
4. Dalı push'layın (`git push origin feature/harika-ozellik`)
5. Bir Pull Request açın

---

## 🙏 Teşekkürler

- **[yvg](https://github.com/yvg/antigravity-telegram-suite)** — Belirli IDE pencerelerine komut yönlendirme yeteneğini kazandıran Çoklu Pencere Desteği özelliği için!
- **[achshar](https://github.com/achshar/antigravity-telegram-suite)** — Konu (thread) yönetimi için IDE'nin DOM yapısını tanımlamaya yardımcı olan Agent Manager arayüz lokasyonları için!
- **[acmavirus/antigravity-telegram-control](https://github.com/acmavirus/antigravity-telegram-control)** — Bu projeye temel oluşturan temiz, açık kaynaklı Telegram entegrasyonu için.
- **[yazanbaker94/AntiGravity-AutoAccept](https://github.com/yazanbaker94/AntiGravity-AutoAccept)** — Otomatik tıklama (Auto-Accept) modülündeki DOM observer yapısına ilham veren projesi için.

## 🌟 Krediler ve İlham Kaynağı

Çoklu ajan **Turbo Mod** orkestrasyon mimarisi, Interdesigncorp Lab tarafından geliştirilen [Agents-Council](https://github.com/interdesigncorp-lab/Agents-Council) reposundan ilham alınarak tasarlanmıştır.

---

## 📄 Lisans

Bu proje MIT Lisansı altında lisanslanmıştır — detaylar için [LICENSE](LICENSE) dosyasına bakın.

---

<div align="center">
Koltuktan kod yazan uzaktan geliştiriciler için <a href="https://emreturkmen.com">Emre Türkmen</a> tarafından ❤️ ile yapılmıştır.

**Hey Google, bana bir iş vermek istersen [hello@emreturkmen.com](mailto:hello@emreturkmen.com) adresinden ulaşabilirsin 😂**
</div>
