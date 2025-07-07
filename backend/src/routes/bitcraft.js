const express = require('express');
const router = express.Router();
const axios = require('axios');

// BitCraft API configuration
const BITCRAFT_API_BASE = process.env.BITCRAFT_API_BASE || 'https://api.bitcraft.com';
const BITCRAFT_API_KEY = process.env.BITCRAFT_API_KEY;

// Middleware to add BitCraft API headers
const addBitCraftHeaders = (req, res, next) => {
  req.bitcraftHeaders = {
    'Authorization': `Bearer ${BITCRAFT_API_KEY}`,
    'Content-Type': 'application/json',
    'User-Agent': 'BitCraft-Companion-App/1.0.0'
  };
  next();
};

// Get world map data
router.get('/world-map', addBitCraftHeaders, async (req, res) => {
  try {
    const response = await axios.get(`${BITCRAFT_API_BASE}/world/map`, {
      headers: req.bitcraftHeaders,
      params: {
        include_claims: true,
        include_resources: true,
        bounds: req.query.bounds // Optional: specific map bounds
      }
    });

    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    console.error('Error fetching world map:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch world map data',
      message: error.message
    });
  }
});

// Get user claims
router.get('/claims', addBitCraftHeaders, async (req, res) => {
  try {
    const response = await axios.get(`${BITCRAFT_API_BASE}/user/claims`, {
      headers: req.bitcraftHeaders,
      params: {
        user_id: req.user.id
      }
    });

    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    console.error('Error fetching user claims:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user claims',
      message: error.message
    });
  }
});

// Get claim details
router.get('/claims/:claimId', addBitCraftHeaders, async (req, res) => {
  try {
    const { claimId } = req.params;
    const response = await axios.get(`${BITCRAFT_API_BASE}/claims/${claimId}`, {
      headers: req.bitcraftHeaders,
      params: {
        include_resources: true,
        include_members: true
      }
    });

    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    console.error('Error fetching claim details:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch claim details',
      message: error.message
    });
  }
});

// Get user empires
router.get('/empires', addBitCraftHeaders, async (req, res) => {
  try {
    const response = await axios.get(`${BITCRAFT_API_BASE}/user/empires`, {
      headers: req.bitcraftHeaders,
      params: {
        user_id: req.user.id
      }
    });

    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    console.error('Error fetching user empires:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user empires',
      message: error.message
    });
  }
});

// Get empire details
router.get('/empires/:empireId', addBitCraftHeaders, async (req, res) => {
  try {
    const { empireId } = req.params;
    const response = await axios.get(`${BITCRAFT_API_BASE}/empires/${empireId}`, {
      headers: req.bitcraftHeaders,
      params: {
        include_members: true,
        include_claims: true
      }
    });

    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    console.error('Error fetching empire details:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch empire details',
      message: error.message
    });
  }
});

// Get resources in an area
router.get('/resources', addBitCraftHeaders, async (req, res) => {
  try {
    const { x, y, radius = 100 } = req.query;
    const response = await axios.get(`${BITCRAFT_API_BASE}/world/resources`, {
      headers: req.bitcraftHeaders,
      params: {
        x: parseInt(x),
        y: parseInt(y),
        radius: parseInt(radius)
      }
    });

    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    console.error('Error fetching resources:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch resources',
      message: error.message
    });
  }
});

// Get server status
router.get('/server-status', addBitCraftHeaders, async (req, res) => {
  try {
    const response = await axios.get(`${BITCRAFT_API_BASE}/server/status`, {
      headers: req.bitcraftHeaders
    });

    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    console.error('Error fetching server status:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch server status',
      message: error.message
    });
  }
});

// Get online players
router.get('/online-players', addBitCraftHeaders, async (req, res) => {
  try {
    const response = await axios.get(`${BITCRAFT_API_BASE}/server/players`, {
      headers: req.bitcraftHeaders
    });

    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    console.error('Error fetching online players:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch online players',
      message: error.message
    });
  }
});

// Search for players
router.get('/search/players', addBitCraftHeaders, async (req, res) => {
  try {
    const { query, limit = 10 } = req.query;
    const response = await axios.get(`${BITCRAFT_API_BASE}/search/players`, {
      headers: req.bitcraftHeaders,
      params: {
        q: query,
        limit: parseInt(limit)
      }
    });

    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    console.error('Error searching players:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to search players',
      message: error.message
    });
  }
});

module.exports = router; 