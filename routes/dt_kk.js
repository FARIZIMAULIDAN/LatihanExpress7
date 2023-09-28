const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator')
const connection = require('../config/db');

router.get('/', (req, res) => {
    connection.query('SELECT dk.id_detail, dk.no_kk, dk.nik, dk.status_hubungan, ktp_ayah.nama_lengkap AS ayah, ktp_ibu.nama_lengkap AS ibu FROM detail_kk AS dk LEFT JOIN ktp AS ktp_ayah ON dk.ayah = ktp_ayah.nik LEFT JOIN ktp AS ktp_ibu ON dk.ibu = ktp_ibu.nik', (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Gagal',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Detail KK',
                data: rows,
            });
        }
    });
});
router.post('/store',[
    body('nik').notEmpty(),
    body('ayah').notEmpty(),
    body('ibu').notEmpty(),
    body('no_kk').notEmpty(),
    body('status_hubungan').notEmpty(),
],(req, res) =>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let Data = {
        nik: req.body.nik,
        ayah: req.body.ayah,
        ibu: req.body.ibu,
        no_kk: req.body.no_kk,
        status_hubungan: req.body.status_hubungan,
    }
    connection.query('insert into detail_kk set ?',Data,function(err, rows){
        if(err){
            return res.status(500).json({
                false: false,
                message: 'gagal server',
                error: err
            })
        }else{
            return res.status(200).json({
                status:true,
                message: 'berhasil',
                data: rows[0]
            })
        }
    })
})
router.get('/(:id)',function(req, res){
    let id = req.params.id;
    connection.query(`select *from detail_kk where id_detail = ${id}`,function(err,rows){
        if(err){
            return res.status(500).json({
                status:false,
                message: 'server error',
            })
        }if(rows.length <-0){
            return res.status(404).json({
                status:false,
                message: 'tidak ditemukan',
            })
        }else{
            return res.status(200).json({
                status:true,
                message:'data mahasiswa',
                data:rows[0]
            })
        }
    })
})
router.patch('/update/:id',[
    body('nik').notEmpty(),
    body('ayah').notEmpty(),
    body('ibu').notEmpty(),
    body('no_kk').notEmpty(),
    body('status_hubungan').notEmpty(),
],(req, res) =>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error:error.array()
        });
    }
    let id = req.params.id;
    let Data = {
        nik: req.body.nik,
        ayah: req.body.ayah,
        ibu: req.body.ibu,
        no_kk: req.body.no_kk,
        status_hubungan: req.body.status_hubungan,
    }
    connection.query(`update detail_kk set ? where id_detail = ${id}`,Data,function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message:'server gagal',
            })
        }else{
            return res.status(200).json({
                status:true,
                message: 'update berhasil'
            })
        }
    })
})
router.delete('/delete/(:id)',function(req, res){
    let id = req.params.id;
    connection.query(`delete from detail_kk where id_detail = ${id}`,function(err, rows){
        if(err){
            return res.status(500).json({
                status:false,
                message: 'server gagal',
            })
        }else{
            return res.status(200).json({
                status:true,
                message:'data sudah dihapus',
            })
        }
    })
})
module.exports = router;