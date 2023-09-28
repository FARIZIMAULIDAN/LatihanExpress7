const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator')
const connection = require('../config/db');

router.get('/',function(req, res){
    connection.query('select *from kartu_keluarga order by no_kk desc',function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message:'server gagal',
            })
        }else{
            return res.status(200).json({
                status:true,
                message: 'data Kartu_keluarga',
                data:rows
            })
        }
    })
})
router.post('/store',[
    body('no_kk').notEmpty(),
    body('alamat').notEmpty(),
    body('rt').notEmpty(),
    body('rw').notEmpty(),
    body('kode_pos').notEmpty(),
    body('desa_kelurahan').notEmpty(),
    body('kecamatan').notEmpty(),
    body('kabupaten_kota').notEmpty(),
    body('provinsi').notEmpty(),
],(req, res) =>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let Data = {
        no_kk: req.body.no_kk,
        alamat: req.body.alamat,
        rt: req.body.rt,
        rw: req.body.rw,
        kode_pos: req.body.kode_pos,
        desa_kelurahan: req.body.desa_kelurahan,
        kecamatan: req.body.kecamatan,
        kabupaten_kota: req.body.kabupaten_kota,
        provinsi: req.body.provinsi,
    }
    connection.query('insert into kartu_keluarga set ?',Data,function(err, rows){
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
    connection.query(`select *from kartu_keluarga where no_kk = ${id}`,function(err,rows){
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
    body('no_kk').notEmpty(),
    body('alamat').notEmpty(),
    body('rt').notEmpty(),
    body('rw').notEmpty(),
    body('kode_pos').notEmpty(),
    body('desa_kelurahan').notEmpty(),
    body('kecamatan').notEmpty(),
    body('kabupaten_kota').notEmpty(),
    body('provinsi').notEmpty(),
],(req, res) =>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error:error.array()
        });
    }
    let id = req.params.id;
    let Data = {
        no_kk: req.body.no_kk,
        alamat: req.body.alamat,
        rt: req.body.rt,
        rw: req.body.rw,
        kode_pos: req.body.kode_pos,
        desa_kelurahan: req.body.desa_kelurahan,
        kecamatan: req.body.kecamatan,
        kabupaten_kota: req.body.kabupaten_kota,
        provinsi: req.body.provinsi, 
    }
    connection.query(`update kartu_keluarga set ? where no_kk = ${id}`,Data,function(err, rows){
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
    connection.query(`delete from kartu_keluarga where no_kk = ${id}`,function(err, rows){
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