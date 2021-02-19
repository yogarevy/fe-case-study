$(document).ready(function () {
   console.log('TEST');
    $('#table-warga').DataTable({
        // rowReorder: {
        //     selector: 'td:nth-child(2)'
        // },
        responsive: true
    });
});

Vue.filter('currency', function (money) {
    return accounting.formatMoney(money, "Rp ", 2, ".", ",")
});

let app = new Vue({
    el: '#app',
    data: {
        rows: [
            { nik: 123456789045, name: 'Yoga Revy Setiadi', age: 26, no_kk: 1234334565, foto_ktp: 'ktp.jpg', foto_kk: 'kk.jpg',gender: 'laki-laki', address: 'Jalan-jalan', rt: '02', rw: '06', income_before: 3800000, income_after: 5765000, reason: 'Lorem ipsum dolor sit amet' },
        ],
        isHidden: true,
        isHiddenDetail: true,
        nameInput: '',
        nikInput: '',
        noKkInput: '',
        umurInput: '',
        genderInput: '',
        alamatInput: '',
        rtInput: '',
        rwInput: '',
        pSebelumPandemiInput: '',
        pSetelahPandemiInput: '',
        alasanPilih: '',
        lainnya: '',
        alasan_msg: '',
        ktp_msg: '',
        kk_msg: '',
        toc: false,
        hasErrorName: false,
        hasErrorNik: false,
        hasErrorNoKK: false,
        hasErrorUmur: false,
        hasErrorGender: false,
        hasErrorAlamat: false,
        hasErrorRt: false,
        hasErrorRw: false,
        hasErrorSebPan: false,
        hasErrorSetPan: false,
        dataInput: [],
        errors: null,
        time_set: 0,
        money: {
            decimal: ',',
            thousands: '.',
            prefix: 'Rp. ',
            suffix: '',
            precision: 2,
            masked: false
        }
    },
    computed: {
        isDisabled: function(){
            return !this.toc;
        }
    },
    methods: {
        filterKey(e){
            const key = e.key;
            // If is '.' key, stop it
            if (key === '.')
                return e.preventDefault();
            // If is 'e' key, stop it
            if (key === 'e')
                return e.preventDefault();
        },
        // This can also prevent copy + paste invalid character
        filterInput(e){
            e.target.value = e.target.value.replace(/[^0-9]+/g, '');
        },
        generateNumber: function () {
            return Math.floor(Math.random()*(2000-500+1)+500);
        },
        detail: function (e, row) {
            this.nama = row.name;
            this.nik = row.nik;
            this.no_kk = row.no_kk;
            this.foto_ktp = row.foto_ktp;
            this.foto_kk = row.foto_kk;
            this.age = row.age;
            this.gender = row.gender;
            this.address = row.address;
            this.rt = row.rt;
            this.rw = row.rw;
            this.income_before = row.income_before;
            this.income_after = row.income_after;
            this.reason = row.reason;

            this.isHiddenDetail = false;
        },
        removeData: function (row) {
            this.rows.splice(this.rows.indexOf(row), 1);
        },
        addDataWarga: function (e) {
            console.log('Click button submit...');
            // Initiation input data
            let nama = this.nameInput;
            let nik = this.nikInput;
            let no_kk = this.noKkInput;
            let file_ktp = this.$refs.fotoKtpInput.files[0];
            let file_kk = this.$refs.fotoKkInput.files[0];
            let age = this.umurInput;
            let gender = this.genderInput;
            let address = this.alamatInput;
            let rt = this.rtInput;
            let rw = this.rwInput;
            let income_before = this.pSebelumPandemiInput;
            let income_after = this.pSetelahPandemiInput;
            let reason = this.alasanPilih;
            let lainnya = this.lainnya;

            // Validation data input
            if(!this.nameInput) { this.hasErrorName = true; this.$refs.nameInput.focus(); return; } else { this.hasErrorName = false }
            if(!this.nikInput) { this.hasErrorNik = true; this.$refs.nikInput.focus(); return; } else { this.hasErrorNik = false }
            if(!this.noKkInput) { this.hasErrorNoKK = true; this.$refs.noKkInput.focus(); return; } else { this.hasErrorNoKK = false }
            if (!file_ktp) {
                e.preventDefault();
                this.ktp_msg = 'File harus diisi.';
                this.$refs.fotoKtpInput.focus();
                return;
            } else {
                this.ktp_msg = '';
            }
            if (file_ktp.size > 2 * 1024 * 1024) {
                e.preventDefault();
                this.ktp_msg = 'File terlalu besar (Maksimal 2MB)';
                this.$refs.fotoKtpInput.focus();
                return;
            } else {
                this.ktp_msg = '';
            }
            if (file_ktp.type !== 'image/jpeg' && file_ktp.type !== 'image/jpg' && file_ktp.type !== 'image/png' && file_ktp.type !== 'image/bmp') {
                e.preventDefault();
                this.ktp_msg = 'File harus berformat JPEG,JPG,PNG atau BMP';
                this.$refs.fotoKtpInput.focus();
                return;
            } else {
                this.ktp_msg = '';
            }

            if (!file_kk) {
                e.preventDefault();
                this.kk_msg = 'File harus diisi.';
                this.$refs.fotoKkInput.focus();
                return;
            } else {
                this.kk_msg = '';
            }
            if (file_kk.size > 2 * 1024 * 1024) {
                e.preventDefault();
                this.kk_msg = 'File terlalu besar (Maksimal 2MB)';
                this.$refs.fotoKkInput.focus();
                return;
            } else {
                this.kk_msg = '';
            }if (file_kk.type !== 'image/jpeg' && file_kk.type !== 'image/jpg' && file_kk.type !== 'image/png' && file_kk.type !== 'image/bmp') {
                e.preventDefault();
                this.kk_msg = 'File harus berformat JPEG,JPG,PNG atau BMP';
                this.$refs.fotoKkInput.focus();
                return;
            } else {
                this.kk_msg = '';
            }

            if(!this.umurInput) { this.hasErrorUmur = true; this.$refs.umurInput.focus(); return; } else { this.hasErrorUmur = false }
            if(!this.genderInput) { this.hasErrorGender = true; this.$refs.genderInput.focus(); return; } else { this.hasErrorGender = false }
            if(!this.alamatInput) { this.hasErrorAlamat = true; this.$refs.alamatInput.focus(); return; } else { this.hasErrorAlamat = false }
            if(!this.rtInput) { this.hasErrorRt = true; this.$refs.rtInput.focus(); return; } else { this.hasErrorRt = false }
            if(!this.rwInput) { this.hasErrorRw = true; this.$refs.rwInput.focus(); return; } else { this.hasErrorRw = false }
            if(!this.pSebelumPandemiInput) { this.hasErrorSebPan = true; return; } else { this.hasErrorSebPan = false }
            if(!this.pSetelahPandemiInput) { this.hasErrorSetPan = true; return; } else { this.hasErrorSetPan = false }
            if(!this.alasanPilih) { this.alasan_msg = 'Alasan harus dipilih.'; return; } else { this.alasan_msg = ''; }
            if(this.alasanPilih === 'lainnya' && !this.lainnya) { this.alasan_msg = 'Silakan isi kolom lainnya.'; return; } else { this.alasan_msg = ''; }

            // Process data random between success and fail
            this.time_set = this.generateNumber();
            if (this.time_set > 1500) {
                this.errors = true;
                this.isHidden = true;
            } else {
                let self = this;
                setTimeout(function () {
                    self.rows.push({
                        name: nama,
                        nik: parseInt(nik),
                        no_kk: parseInt(no_kk),
                        foto_ktp: file_ktp.name,
                        foto_kk: file_kk.name,
                        age: parseInt(age),
                        gender: gender,
                        address: address,
                        rt: rt,
                        rw: rw,
                        income_before: income_before,
                        income_after: income_after,
                        reason: reason !== 'lainnya' ? reason : lainnya,
                    });
                    self.errors = false;
                    self.isHidden = true;
                }, self.time_set );
            }

            // log submited data
            console.log('Log data form yang di-submit...');
            console.log(this.rows);

            // clear form after submit data
            this.nameInput = '';
            this.nikInput = '';
            this.noKkInput = '';
            this.umurInput = '';
            this.genderInput = '';
            this.alamatInput = '';
            this.rtInput = '';
            this.rwInput = '';
            this.pSebelumPandemiInput = '';
            this.pSetelahPandemiInput = '';
            this.alasanPilih = '';
            this.lainnya = '';
            this.alasan_msg = '';
            this.ktp_msg = '';
            this.kk_msg = '';
            this.toc = false;
            this.hasErrorName = false;
            this.hasErrorNik = false;
            this.hasErrorNoKK = false;
            this.hasErrorUmur = false;
            this.hasErrorGender = false;
            this.hasErrorAlamat = false;
            this.hasErrorRt = false;
            this.hasErrorRw = false;
            this.hasErrorSebPan = false;
            this.hasErrorSetPan = false;
            this.time_set = 0;
        }
    }
});